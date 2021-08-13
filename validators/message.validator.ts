import { body } from 'express-validator';
import BaseValidator from './base.validator';

export default class MessageValidator extends BaseValidator {
    static getRules() {
        return [
            body('authorId').notEmpty().withMessage('This field must be filled.'),
            body('content').notEmpty().withMessage('This field must be filled').isLength({ min: 5 }).withMessage('This field must be at least 5 character')
        ]
    }
}