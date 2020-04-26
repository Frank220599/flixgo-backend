import {Entity, Column, OneToMany} from "typeorm";
import Review from "./Review";
import Comment from "./Comment";
import Genre from "./Genre";
import Photo from "./Photo";
import Quality from "./Quality";
import {BaseEntity} from "./core/BaseEntity";

@Entity()
class Movie extends BaseEntity {

    @Column()
    public title: string;

    @Column("longtext")
    public description: string;

    @Column()
    public duration: number;

    @Column({default: 0})
    public rating: number;

    @Column()
    public cover: string;

    @Column({default: 0})
    like: number;

    @Column({default: 0})
    dislike: number;

    @Column()
    releaseYear: number;

    @Column()
    age: number;

    @Column()
    country: string;

    @OneToMany(type => Genre, genre => genre.movies)
    genres: Genre[];

    @OneToMany(type => Photo, photo => photo.movie)
    photos: Photo[];

    @OneToMany(type => Review, review => review.movie)
    reviews: Review[];

    @OneToMany(type => Comment, comment => comment.movie)
    comments: Comment[]

}

export default Movie