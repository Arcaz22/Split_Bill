import fs from 'fs';
import mime from 'mime-types';
import { FileInterface } from '../../utils/interface/preview-interface';
import {
    getDirectoryPath,
    validateFileExists
} from '../../utils/validations/file-check';

export const Preview = async (fieldName: string, filename: string): Promise<FileInterface> => {
    const directoryPath = getDirectoryPath(fieldName);
    const filePath = validateFileExists(directoryPath, filename);

    const content = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    return { content, mimeType };
};
