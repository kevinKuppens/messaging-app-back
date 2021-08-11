import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import BaseModel from "./base.model";
import UserModel from "./users.model";

@Entity()
export default class MessageModel extends BaseModel {
    @OneToOne(() => UserModel)
    public fromUser !: any;
    @OneToOne(() => UserModel)
    public toUser !: any;
    @Column('text')
    public content !: string;
}