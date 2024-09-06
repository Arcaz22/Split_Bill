import API from "../api";
import { API_ROUTES } from "@/lib/endpoint";
import { AxiosError } from "axios";
import { Dispatch } from "redux";
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
    REGISTER_USER_ERROR,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS
} from "../action-types/auth-types";

export const registerUser = (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    avatar: File | null;
    roleName?: string;
}) => {
    return async (dispatch: Dispatch) => {
        dispatch(actionPending(REGISTER_USER_PENDING));

        try {
            const formData = new FormData();
            Object.entries(userData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value instanceof File ? value : String(value));
                }
            });

            const response = await API.post(API_ROUTES.AUTH.REGISTER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch(actionSuccess(REGISTER_USER_SUCCESS, response.data));
            toastSuccess('Registrasi berhasil! Silakan login untuk melanjutkan.');
            return response.data;
        } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(actionError(REGISTER_USER_ERROR, errorMessage));
            toastError(errorMessage);
            throw new Error(errorMessage);
        }
    };
};
