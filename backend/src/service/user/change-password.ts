import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../../database/connections";
import {
    changePasswordSchema,
    users
} from "../../database/schema";
import {
    checkPasswordMatch,
    hashPassword,
    verifyOldPassword
} from "../../utils/hash";

export const changePassword = async (userId: string, body: z.infer<typeof changePasswordSchema>) => {
    const { oldPassword, newPassword, confirmNewPassword } = changePasswordSchema.parse(body);

    await verifyOldPassword(userId, oldPassword);
    checkPasswordMatch(newPassword, confirmNewPassword);
    const hashedNewPassword = await hashPassword(newPassword);

    await db.update(users)
        .set({ password: hashedNewPassword })
        .where(eq(users.id, userId))
        .execute();

    const [updatedUser] = await db.select().from(users)
        .where(eq(users.id, userId))
        .limit(1)
        .execute();

    return updatedUser;
};
