import API from "../api";
import { API_ROUTES } from "@/lib/endpoint";
import { LOCAL_STORAGE_KEY, AUTH_TOKEN_KEY } from "../../../lib/constanst";
import {
    actionSuccess,
    actionError,
    actionPending
} from "../action-types/actions";
import {
    toastSuccess,
    toastError
} from "../../../components/toast";
import {
    LOGOUT_USER_ERROR,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS
} from "../action-types/types";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        dispatch(actionPending(LOGOUT_USER_PENDING));

        try {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);

            if (!token) {
                throw new Error("Authorization token is missing");
            }

            await API.post(API_ROUTES.AUTH.LOGOUT, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem(LOCAL_STORAGE_KEY);

            dispatch(actionSuccess(LOGOUT_USER_SUCCESS, null));
            toastSuccess('Logout berhasil! Sampai jumpa lagi.');

        } catch (error) {
            let errorMessage = "An unexpected error occurred during logout";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(actionError(LOGOUT_USER_ERROR, errorMessage));
            toastError(errorMessage);
            throw new Error(errorMessage);
        }
    };
};
