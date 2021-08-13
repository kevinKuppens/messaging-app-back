import { Request, Response } from "express";
import ConversationModel from "../models/conversation.model";
import UserModel from "../models/users.model";
import Repositories from "../repositories";

export default class ConversationController {

    static async getUsers(usersId: number[]) {
        const dataUsers = await usersId.map(async (user: number) => {
            const data = await Repositories.userRepository.findOne({ id: user });
            return data;
        })
        return dataUsers
    }
    static async initConversation(req: Request, res: Response) {
        const users: number[] = req.body.users;
        const newCoversation = await Repositories.conversationRepository.create({ ...req.body } as Object);
        const response = await Repositories.conversationRepository.save(newCoversation);
        for (let i = 0; i < users.length; i++) {
            const user = await Repositories.userRepository.findOne({ id: users[i] }, { relations: ['conversations'] });
            if (user) {
                user.conversations?.push(newCoversation);
                await Repositories.userRepository.save(user);
            }
        }
        res.json(response);
    }

    static async newMessage(req: Request, res: Response) {
        const conversation: ConversationModel | undefined = await Repositories.conversationRepository.findOne({ id: parseInt(req.params.id) }, { relations: ['messages'] });
        const author: UserModel | undefined = await Repositories.userRepository.findOne({ id: req.body.authorId });
        const newMessage = await Repositories.messagesRepository.create({
            author,
            content: req.body.content,
            conversation
        } as Object)
        conversation?.messages?.push(newMessage)
        if (conversation) {
            await Repositories.conversationRepository.save(conversation);
        }
        const response = await Repositories.messagesRepository.save(newMessage);
        res.json(response);
    }
    static async getConversation(req: Request, res: Response) {
        const conversation: ConversationModel | undefined = await Repositories.conversationRepository.findOne({ id: parseInt(req.params.id) }, { relations: ['messages', 'messages.author'] });
        res.json(conversation);
    }
}