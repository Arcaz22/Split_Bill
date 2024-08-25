import { db } from "../../database/connections";
import { users } from "../../database/schema";
import { BaseError } from "../responses/base-error";
import { StatusCodes } from "http-status-codes";
import { eq } from "drizzle-orm";

export const checkUsernameExists = async (username: string) => {
    const existingUser = await db.select().from(users)
        .where(eq(users.username, username))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        throw new BaseError(StatusCodes.BAD_REQUEST, "Username already exists");
    }
};

export const checkEmailExists = async (email: string) => {
    const existingUser = await db.select().from(users)
        .where(eq(users.email, email))
        .limit(1)
        .execute();

    if (existingUser.length > 0) {
        throw new BaseError(StatusCodes.BAD_REQUEST, "Email already exists");
    }
};
