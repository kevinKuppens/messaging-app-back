import { getRepository, Repository } from "typeorm";
import ConversationModel from "./models/conversation.model";
import FriendListModel from "./models/friendList.model";
import MessageModel from "./models/message.models";
import FriendRequestModel from "./models/request.model";
import UserModel from "./models/users.model";

export default class Repositories {
    static userRepository: Repository<UserModel>;
    static requestRepository: Repository<FriendRequestModel>;
    static friendsListRepository: Repository<FriendListModel>;
    static conversationRepository: Repository<ConversationModel>;
    static messagesRepository: Repository<MessageModel>;
    static initRepositories() {
        Repositories.userRepository = getRepository(UserModel);
        Repositories.requestRepository = getRepository(FriendRequestModel);
        Repositories.friendsListRepository = getRepository(FriendListModel);
        Repositories.conversationRepository = getRepository(ConversationModel);
        Repositories.messagesRepository = getRepository(MessageModel);
    }
}