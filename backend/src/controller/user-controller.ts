import {
    Request,
    Response
} from "express";
import { StatusCodes } from "http-status-codes";
import { DataTableResponses } from "../utils/responses/datatable-responses";
import { findUser } from "../service/user/find-user";
import { SearchInterface } from "../utils/interface/search-interface";
import { calculatePagination } from "../utils/interface/pagination-interface";
import { BaseError } from "../utils/responses/base-error";
import { UpdateProfile } from "../service/user/update-profile";
import { BaseResponses } from "../utils/responses/base-responses";
import { AuthenticatedInterface } from "../utils/interface/authenticated-interface";
import { changePassword } from "../service/user/change-password";
import { ProfileUser } from "../service/user/profil";

export const FindUserController = async (req: Request, res: Response) => {
    try {
        const searchParams: SearchInterface = {
            search: req.query.search?.toString() || ""
        };

        const page = parseInt(req.query.page as string, 10) || 1;
        const length = parseInt(req.query.length as string, 10) || 10;

        const pagination = calculatePagination(page, length);

        const { results, total } = await findUser(searchParams, pagination);

        res.status(StatusCodes.OK).json(new DataTableResponses(results, total));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const UpdateProfileController = async (req: AuthenticatedInterface, res: Response) => {
    try {
        const userId = req.user!.id;
        const updatedUser = await UpdateProfile(userId, req.body, req.file);

        res.status(StatusCodes.OK).json(new BaseResponses(StatusCodes.OK, "User profile updated successfully", updatedUser));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred during profile update';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const ChangePasswordController = async (req: AuthenticatedInterface, res: Response) => {
    try {
        const userId = req.user!.id;
        const result = await changePassword(userId, req.body);

        res.status(StatusCodes.OK).json(new BaseResponses(StatusCodes.OK, "Password changed successfully", result));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred during password change';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const GetProfileController = async (req: AuthenticatedInterface, res: Response) => {
    try {
        const userId = req.user!.id;
        const userProfile = await ProfileUser(userId);

        res.status(StatusCodes.OK).json(userProfile);
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred';
        res.status(statusCode).json({ statusCode, message });
    }
};
