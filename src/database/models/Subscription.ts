import {Model, Table, Column, AllowNull, Default, BelongsTo, HasMany} from "sequelize-typescript";
import User from "./User";

@Table({timestamps: true, paranoid: true})
class Subscription extends Model<Subscription> {
    @AllowNull(false)
    @Column
    public name: string;

    @Default(0)
    @Column
    public cost: string;

    //use for include option
    @HasMany(() => User)
    users: User[];

}

export default Subscription