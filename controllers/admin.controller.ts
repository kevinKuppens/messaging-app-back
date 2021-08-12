import { Request, Response } from "express";
import Repositories from "../repositories";

export default class AdminController {
    static async getAllUsers(req: Request, res: Response) {
        const users = await Repositories.userRepository.find({ relations: ['friendRequest', 'friendsList', 'friendsList.friends', 'conversations', 'conversations.messages', 'conversations.messages.author'] });
        res.json(users);
    }
    static async getAllConversations(req: Request, res: Response) {
        const conversations = await Repositories.conversationRepository.find();
        res.json(conversations);
    }
}