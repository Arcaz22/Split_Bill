import { Router } from 'express';
import {
    FindUserController
} from '../controller/user-controller';

const router = Router();

router.get('/', [], FindUserController);

export default router;
