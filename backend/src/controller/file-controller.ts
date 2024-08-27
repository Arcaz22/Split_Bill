import {
    Request,
    Response
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseError } from '../utils/responses/base-error';
import { Preview } from '../service/file/preview';
import { Download } from '../service/file/download';

export const PreviewController = async (req: Request, res: Response) => {
    const { fieldName, fileName } = req.query;

    try {
        const file = await Preview(fieldName as string, fileName as string);
        res.setHeader('Content-Type', file.mimeType);
        res.status(StatusCodes.OK).send(file.content);
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred';
        res.status(statusCode).json({ statusCode, message });
    }
};

export const DownloadController = async (req: Request, res: Response) => {
    const { fieldName, fileName } = req.query;

    try {
        const fileContent = await Download(fieldName as string, fileName as string);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(StatusCodes.OK).send(fileContent);
    } catch (error) {
        const statusCode = error instanceof BaseError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error instanceof BaseError ? error.message : 'An unexpected error occurred';
        res.status(statusCode).json({ statusCode, message });
    }
};
