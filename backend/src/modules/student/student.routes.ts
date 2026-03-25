import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { upload } from '../../config/multer';
import { updateProfileSchema } from './student.schemas';
import {
  getMyProfile,
  getPublicProfile,
  updateProfile,
  uploadCv,
  uploadAvatar,
} from './student.controller';

const router = Router();

// Public - accessed via QR code scan
router.get('/public/:token', getPublicProfile);

// Protected
router.get('/me', authMiddleware, getMyProfile);
router.patch('/me', authMiddleware, validate(updateProfileSchema), updateProfile);
router.post('/me/cv', authMiddleware, upload.single('cv'), uploadCv);
router.post('/me/avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

export default router;
