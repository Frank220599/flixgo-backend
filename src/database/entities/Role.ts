import {Entity, Column, OneToMany} from "typeorm";
import User from "./User";
import {BaseEntity} from "./core/BaseEntity";

@Entity()
class Role extends BaseEntity{

    @Column()
    public name: string;

    @OneToMany(type => User, user => user.role)
    users: User[];
}


export default Role;