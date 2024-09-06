import {
    eq,
    desc,
    and,
    ne
} from "drizzle-orm";
import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import { db } from "../../database/connections";
import {
    users,
    roles
} from "../../database/schema";
import { buildSearchCondition } from "./query-search-user";
import { BaseError } from "../responses/base-error";

type SearchCondition = ReturnType<typeof buildSearchCondition>;

export const checkUsernameExists = async (username: string, idToExclude?: string) => {
    const conditions = [eq(users.username, username)];

    if (idToExclude) {
        conditions.push(ne(users.id, idToExclude));
    }

    const existingUser = await db.select().from(users)
        .where(and(...conditions))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        throw new BaseError(StatusCodes.CONFLICT, "Username already exists");
    }
};

export const checkEmailExists = async (email: string, idToExclude?: string) => {
    const conditions = [eq(users.email, email)];

    if (idToExclude) {
        conditions.push(ne(users.id, idToExclude));
    }

    const existingUser = await db.select().from(users)
        .where(and(...conditions))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        throw new BaseError(StatusCodes.CONFLICT, "Email already exists");
    }
};

export const verifyUserCredentials = async (email: string, password: string) => {
    const [user] = await db.select().from(users)
        .where(eq(users.email, email))
        .limit(1)
        .execute();

    if (!user) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    return user;
}

export const fetchUsers = async (searchCondition: SearchCondition, limit: number, offset: number) => {
    return await db.select({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        phone: users.phone,
        avatar: users.avatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        roleId: users.roleId,
        roleName: roles.name
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(searchCondition)
    .orderBy(desc(users.createdAt))
    .limit(limit)
    .offset(offset)
    .execute();
};

export const fetchTotalUsers = async (searchCondition: SearchCondition): Promise<number> => {
    const result = await db
        .select({ count: users.id })
        .from(users)
        .where(searchCondition)
        .execute();

    const totalCount = result.length;

    return totalCount;
};

export const ensureUserExists = async (id: string) => {
    const [existingUser] = await db.select().from(users).where(eq(users.id, id)).execute();

    if (!existingUser) {
        throw new BaseError(StatusCodes.NOT_FOUND, "User not found");
    }

    return existingUser;
};
