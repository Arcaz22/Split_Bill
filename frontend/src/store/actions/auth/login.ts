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
    LOGIN_USER_ERROR,
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS
} from "../action-types/types";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

export const loginUser = (credentials: { email: string; password: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(actionPending(LOGIN_USER_PENDING));

        try {
            const response = await API.post(API_ROUTES.AUTH.LOGIN, credentials);

            const userData = response.data.data;
            const token = userData.token;

            if (token) {
                localStorage.setItem(AUTH_TOKEN_KEY, token);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
            } else {
                throw new Error("Token is missing in the response");
            }

            dispatch(actionSuccess(LOGIN_USER_SUCCESS, userData));
            toastSuccess('Login berhasil! Selamat datang kembali.');

            return userData;
        } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(actionError(LOGIN_USER_ERROR, errorMessage));
            toastError(errorMessage);
            throw new Error(errorMessage);
        }
    };
};
