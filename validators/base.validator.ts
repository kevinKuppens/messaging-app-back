import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default class BaseValidator {
    static validate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (errors.array().length > 0) {
            console.log(errors);
            return res.status(422).send(errors);
        }
        return next();
    }
}