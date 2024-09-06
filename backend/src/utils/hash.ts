import bcrypt from 'bcrypt';
import { BaseError } from './responses/base-error';
import { StatusCodes } from 'http-status-codes';
import { db } from '../database/connections';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
};

export const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        throw new BaseError(StatusCodes.BAD_REQUEST, "Password and confirm password must match");
    }
};

export const verifyOldPassword = async (userId: string, oldPassword: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1).execute();

    if (!user) {
        throw new BaseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, "Old password is incorrect");
    }

    return user;
};
