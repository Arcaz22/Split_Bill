import {
    AsyncState,
    LOGIN_USER_ERROR,
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LoginUserActions
} from "@/store/actions/action-types/types";

const initialState: AsyncState = {
    loading: false,
    data: null,
    error: null,
};

export const loginReducer = (
    state = initialState,
    action: LoginUserActions
): AsyncState => {
    switch (action.type) {
      case LOGIN_USER_PENDING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          error: null,
        };
      case LOGIN_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
};
