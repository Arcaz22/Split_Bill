import API from "../api";
import { actionSuccess, actionError, actionPending } from "../action-types";
import { toastSuccess, toastError } from "../../../components/toast";
import { LOCAL_STORAGE_KEY } from "../../../lib/constanst";
import { Dispatch } from "redux";
import { REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./types";
import { AxiosError } from "axios";
import { API_ROUTES } from "@/lib/endpoint";

export const registerUser = (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    avatar: File;
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

            console.log('Sending user data to server:', userData);

            const response = await API.post(API_ROUTES.AUTH.REGISTER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server response:', response);
            dispatch(actionSuccess(REGISTER_USER_SUCCESS, response.data));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
            toastSuccess('User registered successfully!');
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
