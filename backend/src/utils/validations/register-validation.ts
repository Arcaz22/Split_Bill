import { z } from 'zod';
import { hashPassword } from '../hash';
import { insertUsersSchema } from '../../database/schema';
import {
    checkEmailExists,
    checkPasswordMatch,
    checkUsernameExists
} from './user-check';

export const validateAndHashPassword = async (data: z.infer<typeof insertUsersSchema>) => {
    const validatedData = insertUsersSchema.parse(data);

    await checkUsernameExists(validatedData.username);
    await checkEmailExists(validatedData.email);
    await checkPasswordMatch(validatedData.password, validatedData.confirmPassword);

    const hashedPassword = await hashPassword(validatedData.password);

    return { validatedData, hashedPassword };
};
