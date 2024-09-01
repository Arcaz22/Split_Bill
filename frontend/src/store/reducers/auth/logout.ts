import {
    AsyncState,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    LogoutUserActions
} from "@/store/actions/action-types/types";

const initialState: AsyncState = {
    loading: false,
    data: null,
    error: null,
};

export const logoutReducer = (
    state = initialState,
    action: LogoutUserActions
): AsyncState => {
    switch (action.type) {
      case LOGOUT_USER_PENDING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGOUT_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          error: null,
        };
      case LOGOUT_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
};
