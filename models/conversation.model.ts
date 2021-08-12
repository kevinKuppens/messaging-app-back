import { Entity, OneToMany } from "typeorm";
import BaseModel from "./base.model";
import MessageModel from "./message.models";


@Entity()
export default class ConversationModel extends BaseModel {
    @OneToMany(() => MessageModel, messages => messages.conversation)
    public messages?: MessageModel[];
}