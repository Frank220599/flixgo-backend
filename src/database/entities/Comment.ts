import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import User from "./User";
import Movie from "./Movie";

@Entity()
class Comment extends BaseEntity {

    @Column('longtext')
    public text: string;

    @Column({default: 0})
    public like: number;

    @Column({default: 0})
    public dislike: number;

    @Column()
    public movieId: number;

    @ManyToOne(type => Comment, comment => comment.children)
    public parent: Comment;

    @OneToMany(type => Comment, comment => comment.parent)
    public children: Comment[];

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Movie, movie => movie.reviews)
    movie: Movie;

}

export default Comment
