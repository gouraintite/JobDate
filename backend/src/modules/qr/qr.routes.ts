import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { getMyQrCode } from './qr.controller';

const router = Router();

router.get('/me', authMiddleware, getMyQrCode);

export default router;
