import Router, { Request, Response } from 'express';
import AuthentificationController from '../controllers/auth.controller';
import UsersController from '../controllers/users.controller';
import UsersValidator from '../validators/users.validator';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('OK gros');
})

router.get('/api/v1/users/:id', AuthentificationController.authorize, UsersController.getUser)
router.post('/api/v1/users', UsersValidator.getRules(), UsersValidator.validate, UsersController.register)
router.put('/api/v1/users/:id', AuthentificationController.authorize, UsersController.update)
router.delete('/api/v1/users/:id', UsersController.delete)

export { router as UsersRoutes };