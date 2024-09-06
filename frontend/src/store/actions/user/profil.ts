import API from "../api";
import { API_ROUTES } from "@/lib/endpoint";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import { UserData } from "@/lib/interface/user-interface";
import {
    Action,
    ThunkAction
} from "@reduxjs/toolkit";
import {
    toastError,
    toastSuccess
} from "@/components/toast";
import {
    actionSuccess,
    actionError,
    actionPending
} from "../action-types/actions";
import {
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_PENDING,
    UPDATE_PROFILE_SUCCESS
} from "../action-types/user-types";

export const updateUserProfile = (formData: FormData): ThunkAction<Promise<UserData>, RootState, unknown, Action<string>> => {
    return async (dispatch: Dispatch) => {
        dispatch(actionPending(UPDATE_PROFILE_PENDING));

        try {
            const response = await API.put(API_ROUTES.USER.UPDATE_PROFILE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedData = response.data;

            const updatedProfileWithAvatar = {
                ...updatedData,
            };

            dispatch(actionSuccess(UPDATE_PROFILE_SUCCESS, updatedProfileWithAvatar));
            toastSuccess("Profile updated successfully!");

            return updatedProfileWithAvatar;
        } catch (error) {
            let errorMessage = "An unexpected error occurred";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(actionError(UPDATE_PROFILE_ERROR, errorMessage));
            toastError(errorMessage);
            throw new Error(errorMessage);
        }
    };
};
