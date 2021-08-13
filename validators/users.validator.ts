import { body } from 'express-validator';
import BaseValidator from './base.validator';

export default class UsersValidator extends BaseValidator {
    static getRules() {
        return [
            body('firstName').notEmpty().withMessage('Firstname field must be filled.').isString().withMessage('This field must be filled with string characters').isLength({ min: 3, max: 25 }).withMessage('This field must be at least 5 characters and maximum 25 character'),
            body('lastName').notEmpty().withMessage('Firstname field must be filled.').isString().withMessage('This field must be filled with string characters').isLength({ min: 3, max: 25 }).withMessage('This field must be at least 5 characters and maximum 25 character'),
            body('email').notEmpty().withMessage('Firstname field must be filled.').isEmail().withMessage('This field must be a valid email adress'),
            body('password').notEmpty().withMessage('This field must be filled').isStrongPassword().withMessage('This password id not strong enough')
        ]
    }
}