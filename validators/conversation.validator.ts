import { body } from 'express-validator';
import BaseValidator from './base.validator';

export default class ConversationValidator extends BaseValidator {
    static getRules() {
        return [
            body('users').notEmpty().withMessage('This field must be filled').isArray().withMessage('This field must be received as an array'),
        ]
    }
}