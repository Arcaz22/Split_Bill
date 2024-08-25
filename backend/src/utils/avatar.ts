import { env } from './env';

export class Avatar {
    static getAvatarUrls(avatar: string | null): { downloadUrl: string; previewUrl: string } | null {
        if (!avatar) {
            return null;
        }
        const baseUrl = env.BASE_URL;
        const fileName = avatar;
        return {
            downloadUrl: `${baseUrl}/file/download?fieldName=avatar&fileName=${fileName}`,
            previewUrl: `${baseUrl}/file/preview?fieldName=avatar&fileName=${fileName}`
        };
    }

    static setAvatar(path: string | null): string | null {
        if (path && path.includes(env.BASE_URL)) {
            const url = new URL(path);
            return url.pathname.split('/').pop() || null;
        } else {
            return path;
        }
    }
}
