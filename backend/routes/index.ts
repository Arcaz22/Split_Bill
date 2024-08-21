import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'SELAMAT DATANG DI API SPLIT BILL 🧾💲💵',
  });
});

export default router;
