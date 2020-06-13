import {Entity, Column, ManyToOne} from "typeorm";
import Movie from "./Movie";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class Photo extends BaseEntity{

    @Column({unique: false})
    public name: string;

    @ManyToOne(type => Movie, movie => movie.photos)
    movie: Movie;

}

export default Photo
