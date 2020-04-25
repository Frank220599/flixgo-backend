import {
    AllowNull,
    Column,
    DefaultScope,
    HasMany,
    Model,
    Default,
    Table,
    Unique,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import Review from "./Review";
import Comment from "./Comment";
import Role from "./Role";
import Subscription from "./Subscription";

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Table({timestamps: true, paranoid: true})
class User extends Model<User> {
    @Unique
    @AllowNull(false)
    @Column
    public email: string;

    @AllowNull(false)
    @Column
    public firstName: string;

    @AllowNull(false)
    @Column
    public lastName: string;

    @Default(0)
    @AllowNull(false)
    @Column
    public status: number;

    @AllowNull(false)
    @Column
    password: string;

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column
    roleId: number;

    @ForeignKey(() => Subscription)
    @AllowNull(false)
    @Column
    subscriptionId: number;

    @BelongsTo(() => Subscription)
    subscription: Subscription;

    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => Review)
    reviews: Review[];

    @HasMany(() => Comment)
    comments: Comment[]
}


export default User;