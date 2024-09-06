import {
    AsyncState,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UpdateProfileUserActions
} from "@/store/actions/action-types/user-types";

const initialState: AsyncState = {
    loading: false,
    data: null,
    avatar: null,
    error: null,
};

export const profileReducer = (
    state = initialState,
    action: UpdateProfileUserActions
): AsyncState => {
    switch (action.type) {
        case UPDATE_PROFILE_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case UPLOAD_AVATAR_SUCCESS:
            return {
                ...state,
                avatar: action.avatar,
            };
        default:
            return state;
    }
};
