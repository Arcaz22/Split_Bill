import { UserData } from "@/lib/interface/user-interface";

export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

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

export type RegisterUserActions =
  | RegisterUserPendingAction
  | RegisterUserSuccessAction
  | RegisterUserErrorAction;
