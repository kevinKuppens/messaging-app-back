import { Entity, JoinColumn, OneToMany } from "typeorm";
import BaseModel from "./base.model";
import UserModel from "./users.model";

@Entity()
export default class FriendListModel extends BaseModel {
    @OneToMany(() => UserModel, friends => friends.user)
    @JoinColumn()
    public friends?: UserModel[];
}