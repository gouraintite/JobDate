import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { upload } from '../../config/multer';
import { updateCompanySchema } from './company.schemas';
import { getMyCompany, updateMyCompany, uploadLogo } from './company.controller';

const router = Router();

router.get('/me', authMiddleware, getMyCompany);
router.patch('/me', authMiddleware, validate(updateCompanySchema), updateMyCompany);
router.post('/me/logo', authMiddleware, upload.single('logo'), uploadLogo);

export default router;
