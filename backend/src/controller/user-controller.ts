import {
    Request,
    Response
} from "express";
import { StatusCodes } from "http-status-codes";
import { DataTableResponses } from "../utils/responses/datatable-responses";
import { findUser } from "../service/user/find-user";

export const FindUserController = async (req: Request, res: Response) => {
    try {
        const searchParams = {
            search: req.query.search as string,
        };

        const paginationParams = {
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            length: req.query.length ? parseInt(req.query.length as string, 10) : undefined,
        };

        const { results, total } = await findUser(searchParams, paginationParams);

        const response = new DataTableResponses(results, total);

        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch users", error });
    }
};
