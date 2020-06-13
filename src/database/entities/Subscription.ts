import {Entity, Column, OneToMany} from "typeorm";
import User from "./User";
import {BaseEntity} from "./core/BaseEntity";

@Entity()
class Subscription extends BaseEntity{

    @Column({unique: true})
    public name: string;

    @Column({default: 0})
    public cost: string;

    @OneToMany(type => User, user => user.subscription)
    users: User[];

}

export default Subscription
