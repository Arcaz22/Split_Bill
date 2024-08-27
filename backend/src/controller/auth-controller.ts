import {
    Request,
    Response
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseResponses } from '../utils/responses/base-responses';
import { BaseError } from '../utils/responses/base-error';
import { Register } from '../service/auth/register';
import { Login } from '../service/auth/login';
import { Logout } from '../service/auth/logout';

export const RegisterController = async (req: Request, res: Response) => {
    try {
        const avatar = req.file ? req.file.filename : null;
        const { roleName, ...restOfData } = req.body;
        const data = { ...restOfData, roleName, avatar };

        const newUser = await Register(data);

        res.status(StatusCodes.CREATED).json(new BaseResponses(StatusCodes.CREATED, "User registered successfully", newUser));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred during registration';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const LoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const loginData = await Login(email, password);

        res.status(StatusCodes.OK).json(new BaseResponses(StatusCodes.OK, "Login successful", loginData));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred during login';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const LogoutController = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ')[1] : null;

        if (token) {
            await Logout(token);
        }

        res.status(StatusCodes.OK).json(new BaseResponses(StatusCodes.OK, "Logout successful"));
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred during logout';
        res.status(statusCode).json({ statusCode, message });
    }
};
