import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class BaseModel {
    @PrimaryGeneratedColumn('increment')
    public id !: number;
    @CreateDateColumn()
    public creationDate!: Date;
    @UpdateDateColumn()
    public updateDate!: Date;
    @DeleteDateColumn()
    public deletionDate!: Date;
}