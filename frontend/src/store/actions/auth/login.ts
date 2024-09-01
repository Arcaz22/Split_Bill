import API from "../api";
import { API_ROUTES } from "@/lib/endpoint";
import { LOCAL_STORAGE_KEY } from "../../../lib/constanst";
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

            const userData = response.data;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
            console.log('User data saved in localStorage:', localStorage.getItem(LOCAL_STORAGE_KEY));


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
