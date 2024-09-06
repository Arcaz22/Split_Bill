import {
    AsyncState,
    REGISTER_USER_ERROR,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    RegisterUserActions
} from "@/store/actions/action-types/auth-types";

const initialState: AsyncState = {
    loading: false,
    data: null,
    error: null,
};

export const registerReducer = (
    state = initialState,
    action: RegisterUserActions
): AsyncState => {
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
          error: action.error,
        };
      default:
        return state;
    }
};
