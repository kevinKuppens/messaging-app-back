import Router from 'express';
import RequestController from '../controllers/request.controller';
import RequestValidator from '../validators/request.validator';
const router = Router();

router.post('/api/v1/addFriend/:id', RequestValidator.getNewRequestRules(), RequestValidator.validate, RequestController.sendRequest);
router.post('/api/v1/acceptRequest/:id', RequestController.acceptRequest);
router.delete('/api/v1/refuseRequest', RequestController.refuseRequest);

export { router as RequestRouter };