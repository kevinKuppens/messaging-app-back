import Router from 'express';
import RequestController from '../controllers/request.controller';
const router = Router();

router.post('/api/v1/addFriend/:id', RequestController.sendRequest);
router.post('/api/v1/acceptRequest/:id', RequestController.acceptRequest);
router.delete('/api/v1/refuseRequest', RequestController.refuseRequest);

export { router as RequestRouter };