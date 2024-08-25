import express from 'express';

import AuthRouter from './auth';
import FileRouter from './file';
import UserRouter from './user';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'SELAMAT DATANG DI API SPLIT BILL 🧾💲💵',
  });
});

router.use('/auth', AuthRouter);
router.use('/file', FileRouter);
router.use('/user', UserRouter);

export default router;
