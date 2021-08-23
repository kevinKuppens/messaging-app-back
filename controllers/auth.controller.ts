import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
import Repositories from "../repositories";
import jwt from 'jsonwebtoken';

export default class AuthentificationController {
    static async login(req: Request, res: Response) {
        try{
            req.body.password = crypto.createHmac('sha256', process.env.SECRET ?? '').update(req.body.password).digest("hex");
            const user = await Repositories.userRepository.findOne({ email: req.body.email });
            if (user && user.password === req.body.password) {
                const data = {
                    id: user.id
                }
                const response = await jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 30),
                    data: data,
                }, process.env.SECRET ?? '')
                res.status(200).json(response);
            }else{
                const error =  new Error();
                if(user){
                    error.message="Wrong password";
                    res.status(401).send(error);
                }else{
                    error.message = 'User not found';
                    res.status(404).send(error);
                }   
            }
        }catch(e){
            console.log(e);
            res.send(e)
        }
    }
    static async authorize(req: Request, res: Response, next: NextFunction) {
        let token: string = req.headers.authorization ?? '';
        if (token.startsWith('Bearer')) {
            token = token.split(' ')[1]
        }
        jwt.verify(token, process.env.SECRET ?? '', (err) => {
            if (!err) {
                next();
            } else {
                const error = new Error();
                error.message = "Unauthorized acces";
                res.status(401).send(error.message);
            }
        })

    }
}