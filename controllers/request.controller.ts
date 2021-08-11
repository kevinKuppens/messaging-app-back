import { Request, Response } from "express";
import FriendListModel from "../models/friendList.model";
import UserModel from "../models/users.model";
import Repositories from "../repositories";


export default class RequestController {
    static async sendRequest(req: Request, res: Response) {
        req.body.user = parseInt(req.params.id);
        const newRequest = await Repositories.requestRepository.create(req.body);
        res.json(await Repositories.requestRepository.save(newRequest));
    }

    static async refuseRequest(req: Request, res: Response) {
        res.json(await Repositories.requestRepository.softDelete({ id: parseInt(req.body.id) }));
    }

    static async acceptRequest(req: Request, res: Response) {
        const request = await Repositories.requestRepository.findOne({ id: parseInt(req.params.id) });
        const friendList: FriendListModel | undefined = await Repositories.friendsListRepository.findOne({ id: parseInt(req.body.listId) }, { relations: ['friends'] });
        const userToAdd: UserModel | undefined = await Repositories.userRepository.findOne({ id: request?.fromUserId })
        if (userToAdd) {
            friendList!.friends?.push(userToAdd);
        }
        const data = await Repositories.friendsListRepository.create({ ...friendList });
        const response = await Repositories.friendsListRepository.save(data);

        await Repositories.requestRepository.softDelete({ id: parseInt(req.params.id) })

        res.json(response)
    }
}