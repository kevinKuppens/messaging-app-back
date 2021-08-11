import Router from 'express';
import AdminController from '../controllers/admin.controller';

const router = Router();

router.get('/api/v1/admin/users', AdminController.getAllUsers);

export { router as AdminRouter };