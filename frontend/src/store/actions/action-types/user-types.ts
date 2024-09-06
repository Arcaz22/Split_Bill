
import {
    UserData,
    ChangePasswordData
} from "@/lib/interface/user-interface";

export const UPDATE_PROFILE_PENDING = 'UPDATE_PROFILE_PENDING';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'UPDATE_USER_ERROR';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPDATE_PASSWORD_PENDING = 'UPDATE_PASSWORD_PENDING';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';

interface UPDATE_USER_PROFILE_PENDING {
  type: typeof UPDATE_PROFILE_PENDING;
}

interface UPDATE_USER_PROFILE_SUCCESS {
  type: typeof UPDATE_PROFILE_SUCCESS;
  data: UserData;
}

interface UPDATE_USER_PROFILE_ERROR {
  type: typeof UPDATE_PROFILE_ERROR;
  error: string;
}

interface UPLOAD_AVATAR_SUCCESS_ACTION {
    type: typeof UPLOAD_AVATAR_SUCCESS;
    avatar: string;
}

interface UPDATE_PASSWORD_SUCCESS {
    type: typeof UPDATE_PASSWORD_SUCCESS;
    data: ChangePasswordData;
}

interface UPDATE_PASSWORD_PENDING {
    type: typeof UPDATE_PASSWORD_PENDING;
}

interface UPDATE_PASSWORD_ERROR {
    type: typeof UPDATE_PASSWORD_ERROR;
    error: string;
}

export interface AsyncState {
    loading: boolean;
    data: UserData | ChangePasswordData | null;
    avatar: string | null;
    error: string | null;
}

export type UpdateProfileUserActions =
    | UPDATE_USER_PROFILE_PENDING
    | UPDATE_USER_PROFILE_SUCCESS
    | UPDATE_USER_PROFILE_ERROR
    | UPLOAD_AVATAR_SUCCESS_ACTION

export type UpdatePasswordUserActions =
    | UPDATE_PASSWORD_SUCCESS
    | UPDATE_PASSWORD_PENDING
    | UPDATE_PASSWORD_ERROR
