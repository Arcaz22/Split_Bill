import { getAvatarUrls } from "../../utils/validations/avatar-handler";
import { ensureUserExists } from "../../utils/validations/user-check";
import { fetchUsers } from "../../utils/validations/user-check";
import { eq } from "drizzle-orm";
import { users } from "../../database/schema";

export const ProfileUser = async (id: string) => {
    await ensureUserExists(id);

    const [userProfile] = await fetchUsers(eq(users.id, id), 1, 0);

    if (!userProfile) {
        throw new Error("User profile not found");
    }

    const { previewUrl, downloadUrl } = getAvatarUrls('avatar', userProfile.avatar);

    return {
        id: userProfile.id,
        name: userProfile.name,
        username: userProfile.username,
        email: userProfile.email,
        phone: userProfile.phone,
        avatar: {
            fileName: userProfile.avatar,
            previewUrl,
            downloadUrl,
        },
        createdAt: userProfile.createdAt,
        updatedAt: userProfile.updatedAt,
        role: {
            id: userProfile.roleId,
            name: userProfile.roleName
        }
    };
};
