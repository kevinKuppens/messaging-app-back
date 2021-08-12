import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import BaseModel from "./base.model";
import ConversationModel from "./conversation.model";
import FriendListModel from "./friendList.model";
import FriendRequestModel from "./request.model";

@Entity()
export default class UserModel extends BaseModel {
    @Column('varchar')
    public firstName?: string;
    @Column('varchar')
    public lastName !: string;
    @Column('varchar')
    public email !: string;
    @Column('varchar')
    public password !: string;
    @OneToMany(() => FriendRequestModel, friendRequest => friendRequest.user)
    public friendRequest?: FriendRequestModel[];
    @OneToOne(() => FriendListModel)
    @JoinColumn()
    public friendsList?: FriendListModel;
    @ManyToOne(() => FriendListModel, user => user.friends)
    public user?: FriendListModel;
    @ManyToMany(() => ConversationModel)
    @JoinTable()
    public conversations?: ConversationModel[];
}