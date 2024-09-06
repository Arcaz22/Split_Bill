import API from "../api";
import { API_ROUTES } from "@/lib/endpoint";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import { ChangePasswordData } from "@/lib/interface/user-interface";
import {
    toastError,
    toastSuccess
} from "@/components/toast";
import {
    Action,
    ThunkAction
} from "@reduxjs/toolkit";
import {
    actionSuccess,
    actionError,
    actionPending
} from "../action-types/actions";
import {
    UPDATE_PASSWORD_ERROR,
    UPDATE_PASSWORD_PENDING,
    UPDATE_PASSWORD_SUCCESS
} from "../action-types/user-types";

export const changePassword = (formData: ChangePasswordData): ThunkAction<Promise<ChangePasswordData>, RootState, unknown, Action<string>> => {
    return async(dispatch: Dispatch) => {
        dispatch(actionPending(UPDATE_PASSWORD_PENDING));

        try {
            const response = await API.put(API_ROUTES.USER.CHANGE_PASSWORD, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const updatedPassword = response.data;
            dispatch(actionSuccess(UPDATE_PASSWORD_SUCCESS, updatedPassword));
            toastSuccess("Change Password Successfully!");

            return updatedPassword;
        } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(actionError(UPDATE_PASSWORD_ERROR, errorMessage));
            toastError(errorMessage);
            throw new Error(errorMessage);
        }
    }
}
