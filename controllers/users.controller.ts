import { Request, Response } from "express";
import crypto from 'crypto';
import Repositories from "../repositories";


export default class UsersController {
    static async register(req: Request, res: Response) {
        req.body.password = crypto.createHmac('sha256', process.env.SECRET ?? '').update(req.body.password).digest("hex");
        try {
            const newFriendList = await Repositories.friendsListRepository.create({})
            const responseList = await Repositories.friendsListRepository.save(newFriendList);
            const data = {
                ...req.body,
                friendsList: responseList.id
            }
            const newUser = await Repositories.userRepository.create(data);
            const response = await Repositories.userRepository.save(newUser)
            res.status(200).json(response);
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const user = await Repositories.userRepository.update({ id: parseInt(req.params.id) }, req.body);
            res.status(200).json(user);
        } catch (e) {
            res.status(404).send(e);
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            const user = await Repositories.userRepository.softDelete({ id: parseInt(req.params.id) });
            res.status(200).json(user)
        } catch (e) {
            res.status(404).send(e);
        }
    }
}