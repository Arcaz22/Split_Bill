import { Router } from 'express';
import {
    ChangePasswordController,
    FindUserController,
    GetProfileController,
    UpdateProfileController
} from '../controller/user-controller';
import { Authenticate } from '../middlewares/authenticate';
import { upload } from '../middlewares/multer';

const router = Router();

router.get('/', [Authenticate], GetProfileController);
router.get('/find-user', [Authenticate], FindUserController);
router.put('/profile', [Authenticate, upload.single('avatar')], UpdateProfileController);
router.put('/change-password', [Authenticate], ChangePasswordController);

export default router;
