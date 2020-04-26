import {Entity, Column, OneToMany, ManyToOne} from "typeorm";
import Review from "./Review";
import Comment from "./Comment";
import Role from "./Role";
import Subscription from "./Subscription";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class User extends BaseEntity {

    @Column()
    public email: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({default: 0})
    public status: number;

    @Column({select: false})
    password: string;

    @ManyToOne(type => Subscription, subscription => subscription.users)
    public subscription: Subscription;

    @ManyToOne(type => Role, role => role.users)
    public role: Role;

    @OneToMany(type => Review, review => review.user)
    public reviews: Review[];

    @OneToMany(type => Comment, comment => comment.user)
    public comments: Comment[]
}


export default User;