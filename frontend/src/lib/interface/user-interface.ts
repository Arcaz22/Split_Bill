export interface UserData {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
}
export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
