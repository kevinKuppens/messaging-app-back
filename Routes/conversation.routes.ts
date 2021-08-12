import Router from 'express';
import ConversationController from '../controllers/conversation.controller';

const router = Router();

router.post('/api/v1/conversation', ConversationController.initConversation);
router.get('/api/v1/conversation/:id', ConversationController.getConversation);
router.post('/api/v1/conversation/:id', ConversationController.newMessage);

export { router as ConversationRouter };