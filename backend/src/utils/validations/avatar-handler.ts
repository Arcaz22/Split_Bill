import path from 'path';
import fs from 'fs/promises';
import { StatusCodes } from "http-status-codes";
import { BaseError } from '../responses/base-error';
import { env } from '../env';

const avatarImageDir = path.join(__dirname, '../../../images/avatars');

export const saveAvatar = async (newAvatarFile: Express.Multer.File) => {
    try {
        const newAvatarPath = path.join(avatarImageDir, newAvatarFile.filename);
        await fs.rename(newAvatarFile.path, newAvatarPath);
        return newAvatarFile.filename;
    } catch (error) {
        console.error('Gagal menyimpan avatar baru:', error);
        throw new BaseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to save new avatar');
    }
};

export const deleteOldAvatar = async (oldAvatarFilename: string) => {
    try {
        const oldAvatarPath = path.join(avatarImageDir, oldAvatarFilename);
        if (await fs.access(oldAvatarPath).then(() => true).catch(() => false)) {
            await fs.unlink(oldAvatarPath);
        } else {
            console.log(`File avatar lama tidak ditemukan: ${oldAvatarPath}`);
        }
    } catch (error) {
        console.error(`Gagal menghapus avatar lama di ${oldAvatarFilename}:`, error);
        throw new BaseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete old avatar');
    }
};

export const handleAvatarUpdate = async (currentAvatar: string | null, newAvatarFile?: Express.Multer.File) => {
    if (newAvatarFile) {
        if (currentAvatar) {
            await deleteOldAvatar(currentAvatar);
        }
        return await saveAvatar(newAvatarFile);
    }
    return currentAvatar;
};

export const getAvatarUrls = (fieldName: string, fileName: string | null) => {
    if (!fileName) {
        return {
            previewUrl: null,
            downloadUrl: null,
        };
    }

    const baseUrl = `${env.BASE_URL}/file`;
    return {
        previewUrl: `${baseUrl}/preview?fieldName=${fieldName}&fileName=${fileName}`,
        downloadUrl: `${baseUrl}/download?fieldName=${fieldName}&fileName=${fileName}`,
    };
};
