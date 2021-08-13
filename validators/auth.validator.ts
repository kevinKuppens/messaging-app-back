import { body } from 'express-validator';
import BaseValidator from './base.validator';

export default class AuthentificationValidator extends BaseValidator {
    static getLoginRules() {
        return [
            body('email').notEmpty().withMessage('This field must be filled').isEmail().withMessage('This field must be a valid email'),
            body('password').notEmpty().withMessage('This field must be filled')
        ]
    }
}