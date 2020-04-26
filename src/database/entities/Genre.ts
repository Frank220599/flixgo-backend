import {Entity, Column, ManyToMany} from "typeorm";
import Movie from "./Movie";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class Genre extends BaseEntity{

    @Column({unique: true})
    public name: string;

    @ManyToMany(() => Movie, movie => movie.genres)
    movies: Movie[];

}

export default Genre