import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const avatarImageDir = path.join(__dirname, '../../images/avatars');

if (!fs.existsSync(avatarImageDir)) {
    fs.mkdirSync(avatarImageDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        console.log('Multer is setting the destination...');
        cb(null, avatarImageDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log(`Multer is setting the filename: ${filename}`);
        cb(null, filename);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        console.log('Multer file filter passed');
        return cb(null, true);
    } else {
        console.error('Multer file filter failed: File type not supported');
        cb(new Error('File type not supported'));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter
});
