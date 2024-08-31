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
