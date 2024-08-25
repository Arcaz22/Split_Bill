import { Request, Response } from "express";
import { findUser } from "../service/user/find-user";
import { DataTableResponses } from "../utils/responses/datatable-responses";
import { StatusCodes } from "http-status-codes";

export const FindUserController = async (req: Request, res: Response) => {
    try {
        // Ambil parameter pencarian dan pagination dari query string
        const searchParams = {
            search: req.query.search as string,
        };

        const paginationParams = {
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            length: req.query.length ? parseInt(req.query.length as string, 10) : undefined,
        };

        // Panggil service untuk mendapatkan data pengguna
        const { results, total } = await findUser(searchParams, paginationParams);

        // Buat respons menggunakan DataTableResponses
        const response = new DataTableResponses(results, total);

        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch users", error });
    }
};
