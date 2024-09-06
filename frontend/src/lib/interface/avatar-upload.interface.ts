export interface AvatarUploadProps {
    avatar?: string | null;
    onAvatarChange: (file: File | null) => void;
}
