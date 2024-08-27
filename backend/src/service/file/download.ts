import fs from 'fs';
import {
    getDirectoryPath,
    validateFileExists
} from '../../utils/validations/file-check';

export const Download = async (fieldName: string, filename: string): Promise<Buffer> => {
    const directoryPath = getDirectoryPath(fieldName);
    const filePath = validateFileExists(directoryPath, filename);

    return fs.readFileSync(filePath);
};
