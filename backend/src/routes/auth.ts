import { Router } from 'express';
import {
    RegisterController
} from '../controller/auth-controller';
import { upload } from '../middlewares/multer';

const router = Router();

router.post('/register', upload.single('avatar'), RegisterController);

export default router;
