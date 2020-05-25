import {Entity, Column, OneToMany, ManyToOne} from "typeorm";
import Review from "./Review";
import Comment from "./Comment";
import Role from "./Role";
import Subscription from "./Subscription";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class User extends BaseEntity {

    @Column({unique: true})
    public email: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({default: 0})
    public status: number;

    @Column({select: false})
    password: string;

    @Column({default: 3})
    subscriptionId: number;

    @Column({default: 1})
    roleId: number;

    @ManyToOne(type => Subscription, subscription => subscription.users, {eager: true})
    public subscription: Subscription;

    @ManyToOne(type => Role, role => role.users, {eager: true})
    public role: Role;

    @OneToMany(type => Review, review => review.user)
    public reviews: Review[];

    @OneToMany(type => Comment, comment => comment.user)
    public comments: Comment[]
}


export default User;
