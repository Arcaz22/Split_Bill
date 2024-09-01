import { UserData } from "@/lib/interface/user-interface";

export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

interface RegisterUserPendingAction {
  type: typeof REGISTER_USER_PENDING;
}

interface RegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  data: UserData;
}

interface RegisterUserErrorAction {
  type: typeof REGISTER_USER_ERROR;
  error: string;
}

interface LoginUserPendingAction {
    type: typeof LOGIN_USER_PENDING;
  }

  interface LoginUserSuccessAction {
    type: typeof LOGIN_USER_SUCCESS;
    data: UserData;
  }

  interface LoginUserErrorAction {
    type: typeof LOGIN_USER_ERROR;
    error: string;
  }

export interface AsyncState {
    loading: boolean;
    data: UserData | null;
    error: string | null;
}

export type RegisterUserActions =
  | RegisterUserPendingAction
  | RegisterUserSuccessAction
  | RegisterUserErrorAction;

export type LoginUserActions =
  | LoginUserPendingAction
  | LoginUserSuccessAction
  | LoginUserErrorAction;
