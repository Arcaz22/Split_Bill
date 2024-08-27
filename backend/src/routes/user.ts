import { Router } from 'express';
import {
    FindUserController
} from '../controller/user-controller';
import { Authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/', [Authenticate], FindUserController);

export default router;
