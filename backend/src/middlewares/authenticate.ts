import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseError } from '../utils/responses/base-error';
import { AuthenticatedInterface } from '../utils/interface/authenticated-interface';
import {
    getAuthToken,
    verifyToken
} from '../utils/validations/auth-middleware-validation';

export const Authenticate = (req: AuthenticatedInterface, res: Response, next: NextFunction) => {
    try {
        const token = getAuthToken(req);
        const userPayload = verifyToken(token);
        req.user = userPayload;
        next();
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'Invalid or expired token';
        res.status(statusCode).json({ statusCode, message });
    }
};
