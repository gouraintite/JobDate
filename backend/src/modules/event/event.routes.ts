import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createEventSchema, updateEventSchema } from './event.schemas';
import { list, getOne, create, update, remove, myEvents } from './event.controller';

const router = Router();

// Public
router.get('/', list);
router.get('/:id', getOne);

// Protected (company only)
router.get('/company/mine', authMiddleware, myEvents);
router.post('/', authMiddleware, validate(createEventSchema), create);
router.patch('/:id', authMiddleware, validate(updateEventSchema), update);
router.delete('/:id', authMiddleware, remove);

export default router;
