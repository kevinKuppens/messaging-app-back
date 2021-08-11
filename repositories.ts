import { getRepository, Repository } from "typeorm";
import FriendListModel from "./models/friendList.model";
import FriendRequestModel from "./models/request.model";
import UserModel from "./models/users.model";

export default class Repositories {
    static userRepository: Repository<UserModel>;
    static requestRepository: Repository<FriendRequestModel>;
    static friendsListRepository: Repository<FriendListModel>;
    static initRepositories() {
        Repositories.userRepository = getRepository(UserModel);
        Repositories.requestRepository = getRepository(FriendRequestModel);
        Repositories.friendsListRepository = getRepository(FriendListModel);
    }
}