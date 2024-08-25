import { Request, Response } from 'express';
import { Register } from '../service/auth/register';
import { BaseResponses } from '../utils/responses/base-responses';
import { StatusCodes } from 'http-status-codes';
import { BaseError } from '../utils/responses/base-error';

export const RegisterController = async (req: Request, res: Response) => {
    try {
        const avatar = req.file ? req.file.filename : null;
        const { roleName, ...restOfData } = req.body;
        const data = { ...restOfData, roleName, avatar };

        const newUser = await Register(data);

        res.status(StatusCodes.CREATED).json(new BaseResponses(StatusCodes.CREATED, "User registered successfully", newUser));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred';
        res.status(statusCode).json({ statusCode, message });
    }
};
