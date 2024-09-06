import {
    AsyncState,
    UPDATE_PASSWORD_ERROR,
    UPDATE_PASSWORD_PENDING,
    UPDATE_PASSWORD_SUCCESS,
    UpdatePasswordUserActions
} from "@/store/actions/action-types/user-types";

const initialState: AsyncState = {
    loading: false,
    data: null,
    avatar: null,
    error: null,
};

export const changePasswordReducer = (
    state = initialState,
    action: UpdatePasswordUserActions
): AsyncState => {
    switch (action.type) {
        case UPDATE_PASSWORD_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        default:
            return state;
    }
};
