import {Entity, Column, ManyToOne} from "typeorm";
import User from "./User";
import Movie from "./Movie";
import {BaseEntity} from "./core/BaseEntity";

@Entity()
class Review extends BaseEntity {

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({type: "float"})
    rating: number;

    @Column({default: 0})
    like: number;

    @Column({default: 0})
    dislike: number;

    @Column()
    userId: number;

    @Column()
    movieId: number;

    @ManyToOne(type => User, user => user.reviews)
    user: User;

    @ManyToOne(type => Movie, movie => movie.reviews)
    movie: Movie;

}

export default Review
