import { db } from "../../database/connections";
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { users, insertUsersSchema } from "../../database/schema";
import { validateAndHashPassword } from "../../utils/validations/register-validation";
import { checkEmailExists, checkUsernameExists } from "../../utils/validations/user-check";
import { checkRoleValidity } from "../../utils/validations/check-role";
import { eq } from 'drizzle-orm';

export const Register = async (data: z.infer<typeof insertUsersSchema>) => {
    const { validatedData, hashedPassword } = await validateAndHashPassword(data);

    await checkUsernameExists(validatedData.username);
    await checkEmailExists(validatedData.email);

    const roleId = await checkRoleValidity(validatedData.roleName);

    const newUserId = uuidv4();

    await db.insert(users)
        .values({
            ...validatedData,
            id: newUserId,
            password: hashedPassword,
            roleId: roleId,
        })
        .execute();

    const [newUser] = await db.select().from(users)
        .where(eq(users.id, newUserId))
        .execute();

    return newUser;
};
