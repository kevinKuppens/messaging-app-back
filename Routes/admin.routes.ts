import Router from 'express';
import AdminController from '../controllers/admin.controller';

const router = Router();

router.get('/api/v1/admin/users', AdminController.getAllUsers);
router.get('/api/v1/admin/conversations', AdminController.getAllConversations);

export { router as AdminRouter };