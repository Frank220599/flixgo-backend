import {Entity, Column, ManyToMany} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import Movie from "./Movie";


@Entity()
class Genre extends BaseEntity {

    @Column({unique: true})
    public name: string;

    @ManyToMany(type=> Movie, movie => movie.genres)
    movies: Movie[]

}

export default Genre
