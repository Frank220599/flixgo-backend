import {AllowNull, Column, Model, Table, Unique, HasMany} from "sequelize-typescript";
import Movie from "./Movie";
import User from "./User";

@Table({timestamps: true, paranoid: true})
class Role extends Model<Role> {
    @Unique
    @AllowNull(false)
    @Column
    public name: string;

    @HasMany(() => User)
    users: User[];
}


export default Role;