import { Router } from 'express';
import {
    DownloadController,
    PreviewController
} from '../controller/file-controller';

const router = Router();

router.get('/download', [], DownloadController);
router.get('/preview', [], PreviewController);

export default router;
