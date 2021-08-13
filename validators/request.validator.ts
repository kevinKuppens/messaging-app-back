import { body } from 'express-validator';
import BaseValidator from './base.validator';

export default class RequestValidator extends BaseValidator {
    static getNewRequestRules() {
        return [
            body('fromUserId').notEmpty().withMessage('This field must be filled.')
        ]
    }
}