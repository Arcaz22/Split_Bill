import { z } from "zod";
import { db } from "../../database/connections";
import { users, updateUserSchema } from "../../database/schema";
import { eq } from "drizzle-orm";
import path from 'path';
import fs from 'fs/promises';
import { checkEmailExists, checkUsernameExists, ensureUserExists } from "../../utils/validations/user-check";
import { BaseError } from "../../utils/responses/base-error";
import { handleAvatarUpdate } from "../../utils/validations/avatar-handler";

export const UpdateProfile = async (id: string, data: z.infer<typeof updateUserSchema>, newAvatarFile?: Express.Multer.File) => {
    try {
        return await db.transaction(async (trx) => {
            const currentUser = await ensureUserExists(id);
            const validatedData = updateUserSchema.parse(data);

            if (validatedData.email) {
                await checkEmailExists(validatedData.email, id);
            }

            if (validatedData.username) {
                await checkUsernameExists(validatedData.username, id);
            }

            validatedData.avatar = await handleAvatarUpdate(currentUser.avatar, newAvatarFile);

            await trx.update(users)
                .set(validatedData)
                .where(eq(users.id, id))
                .execute();

            const [updatedUser] = await trx.select().from(users)
                .where(eq(users.id, id))
                .limit(1)
                .execute();

            return updatedUser;
        });
    } catch (error) {
        if (newAvatarFile) {
            const newAvatarPath = path.join(__dirname, '../../../images/avatars', newAvatarFile.filename);
            await fs.unlink(newAvatarPath).catch((err) => console.error(`Gagal menghapus file avatar baru di ${newAvatarPath}:`, err));
        }
        if (error instanceof BaseError) {
            throw error;
        } else {
            throw new Error('Gagal memperbarui profil pengguna.');
        }
    }
};
