import { Request, Response } from "express";
// import FriendListModel from "../models/friendList.model";
import UserModel from "../models/users.model";
// import FriendListModel from "../models/friendList.model";
// import UserModel from "../models/users.model";
import Repositories from "../repositories";


export default class RequestController {
    static async sendRequest(req: Request, res: Response) {
        req.body.user = parseInt(req.params.id);
        req.body.toUserId = req.body.user;
        const newRequest = await Repositories.requestRepository.create(req.body);
        res.json(await Repositories.requestRepository.save(newRequest));
    }

    static async refuseRequest(req: Request, res: Response) {
        res.json(await Repositories.requestRepository.softDelete({ id: parseInt(req.body.id) }));
    }
    static async addToFriendsList(userList: UserModel[], userToAdd: UserModel) {
        userList.push(userToAdd);
        const data = await Repositories.friendsListRepository.create({ ...userList });
        return await Repositories.friendsListRepository.save(data);
    }
    static async acceptRequest(req: Request, res: Response) {
        try {
            const request = await Repositories.requestRepository.findOne({ id: parseInt(req.params.id) });
            if (request) {
                const fromUser = await Repositories.userRepository.findOne({ id: request?.fromUserId }, { relations: ['friendsList', 'friendsList.friends'] });
                const toUser = await Repositories.userRepository.findOne({ id: request?.toUserId }, { relations: ['friendsList', 'friendsList.friends'] })

                if (fromUser?.friendsList?.friends && toUser?.friendsList?.friends) {
                    const fromUserNewList = await RequestController.addToFriendsList(fromUser?.friendsList.friends, toUser)
                    const toUserNewList = await RequestController.addToFriendsList(toUser?.friendsList?.friends, fromUser)
                    if (fromUserNewList && toUserNewList) {
                        await Repositories.friendsListRepository.save(fromUser.friendsList);
                        await Repositories.friendsListRepository.save(toUser.friendsList);
                    }
                }
                await Repositories.requestRepository.softDelete({ id: parseInt(req.params.id) })
                res.json(request)
            } else {
                const error = new Error();
                error.message = 'Request not found';
                error.name = 'requestNotFound';
                res.status(404).json(error);
            }
        } catch (e) {
            console.log(e);
        }

    }
}