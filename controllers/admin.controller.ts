import { Request, Response } from "express";
import Repositories from "../repositories";

export default class AdminController {
    static async getAllUsers(req: Request, res: Response) {
        const users = await Repositories.userRepository.find({ relations: ['friendRequest', 'friendsList', 'friendsList.friends'] });
        res.json(users);
    }
}