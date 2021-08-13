import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import BaseModel from "./base.model";
import ConversationModel from "./conversation.model";
import FriendListModel from "./friendList.model";
import MessageModel from "./message.models";
import FriendRequestModel from "./request.model";

@Entity()
export default class UserModel extends BaseModel {
    @Column('varchar', { nullable: false, length: 25 })
    public firstName?: string;
    @Column('varchar', { nullable: false, length: 25 })
    public lastName !: string;
    @Column('varchar', { nullable: false, unique: true })
    public email !: string;
    @Column('varchar', { nullable: false })
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
    @OneToMany(() => MessageModel, messages => messages.author)
    public messages?: MessageModel[]
}