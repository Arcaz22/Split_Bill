import { Request } from 'express';
import { BaseError } from '../responses/base-error';
import { StatusCodes } from 'http-status-codes';
import { TokenPayloadInterface } from '../interface/token-payload-interface';
import { FetchToken } from '../jwt';
import { isBlacklisted } from '../blacklist';

export const getAuthToken = (req: Request): string => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, 'Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, 'Authorization token is missing');
    }

    return token;
};

export const verifyToken = (token: string): TokenPayloadInterface => {
    if (isBlacklisted(token)) {
        throw new BaseError(StatusCodes.UNAUTHORIZED, 'Token has been blacklisted');
    }

    try {
        return FetchToken(token);
    } catch {
        throw new BaseError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }
};
