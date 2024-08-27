import { db } from "../../database/connections";
import { users } from "../../database/schema";
import { BaseError } from "../responses/base-error";
import { StatusCodes } from "http-status-codes";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';

export const checkUsernameExists = async (username: string) => {
    const existingUser = await db.select().from(users)
        .where(eq(users.username, username))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        throw new BaseError(StatusCodes.CONFLICT, "Username already exists");
    }
};

export const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        throw new BaseError(StatusCodes.BAD_REQUEST, "Password and confirm password must match");
    }
};

export const checkEmailExists = async (email: string) => {
    const existingUser = await db.select().from(users)
        .where(eq(users.email, email))
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
