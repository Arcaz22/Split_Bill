import { Router } from 'express';
import {
    RegisterController,
    LoginController,
    LogoutController
} from '../controller/auth-controller';
import { upload } from '../middlewares/multer';
import { Authenticate } from '../middlewares/authenticate';

const router = Router();

router.post('/register', upload.single('avatar'), RegisterController);
router.post('/login', [], LoginController);
router.post('/logout', [Authenticate], LogoutController);

export default router;
