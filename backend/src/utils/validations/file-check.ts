import fs from 'fs';
import path from 'path';
import { BaseError } from '../responses/base-error';
import { StatusCodes } from 'http-status-codes';

const directories: { [key: string]: string } = {
    avatar: path.join(__dirname, '../../../images/avatars'),
};

export const getDirectoryPath = (fieldName: string): string => {
    const directoryPath = directories[fieldName];
    if (!directoryPath) {
        throw new BaseError(StatusCodes.BAD_REQUEST, 'Directory not found');
    }
    return directoryPath;
};

export const validateFileExists = (directoryPath: string, filename: string): string => {
    const filePath = path.join(directoryPath, filename);
    if (!fs.existsSync(filePath)) {
        throw new BaseError(StatusCodes.NOT_FOUND, 'File not found');
    }
    return filePath;
};
