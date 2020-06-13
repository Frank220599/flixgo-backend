import {Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import Review from "./Review";
import Comment from "./Comment";
import Photo from "./Photo";
import Quality from "./Quality";
import {BaseEntity} from "./core/BaseEntity";
import Genre from "./Genre";

@Entity()
class Movie extends BaseEntity {

    @Column()
    public title: string;

    @Column("longtext")
    public description: string;

    @Column()
    public duration: number;

    @Column({default: 0})
    public views: number;

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

    @Column({default: 0})
    status: number;

    @Column()
    age: number;

    @Column()
    country: string;

    @Column()
    qualityId: number;

    @ManyToMany(type => Genre, genre => genre.movies, {eager: true})
    @JoinTable({name: 'movie_genres'})
    genres: Genre[];

    @OneToMany(type => Photo, photo => photo.movie)
    photos: Photo[];

    @OneToMany(type => Review, review => review.movie)
    reviews: Review[];

    @OneToMany(type => Comment, comment => comment.movie, {eager: true})
    comments: Comment[];

    @ManyToOne(type => Quality, quality => quality.movies, {eager: true})
    quality: Quality;

}

export default Movie
