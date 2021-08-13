import Router from 'express';
import ConversationController from '../controllers/conversation.controller';
import ConversationValidator from '../validators/conversation.validator';
import MessageValidator from '../validators/message.validator';

const router = Router();

router.post('/api/v1/conversation', ConversationValidator.getRules(), ConversationValidator.validate, ConversationController.initConversation);
router.get('/api/v1/conversation/:id', ConversationController.getConversation);
router.post('/api/v1/conversation/:id', MessageValidator.getRules(), MessageValidator.validate, ConversationController.newMessage);

export { router as ConversationRouter };