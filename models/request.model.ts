import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "./base.model";
import UserModel from "./users.model";

@Entity()
export default class FriendRequestModel extends BaseModel {
    @ManyToOne(() => UserModel, user => user.friendRequest)
    public user?: UserModel;
    @Column()
    public fromUserId !: number;
}