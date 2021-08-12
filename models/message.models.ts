import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseModel from "./base.model";
import ConversationModel from "./conversation.model";
import UserModel from "./users.model";

@Entity()
export default class MessageModel extends BaseModel {
    @OneToOne(() => UserModel)
    @JoinColumn()
    public author !: UserModel;
    @Column('text')
    public content !: string;
    @ManyToOne(() => ConversationModel, conversation => conversation.messages)
    public conversation?: ConversationModel;
}