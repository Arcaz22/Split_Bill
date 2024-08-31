import { RegisterState } from "@/lib/interface/user-interface";
import { REGISTER_USER_ERROR, REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, RegisterUserActions } from "@/store/actions/auth/types";

const initialState: RegisterState = {
    loading: false,
    data: null,
    error: null,
};

export const registerReducer = (
    state = initialState, 
    action: RegisterUserActions
): RegisterState => {
    switch (action.type) {
      case REGISTER_USER_PENDING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          error: null,
        };
      case REGISTER_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      default:
        return state;
    }
};
