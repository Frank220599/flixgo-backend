import {Entity, Column, OneToMany} from "typeorm";
import Movie from "./Movie";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class Quality extends BaseEntity {

    @Column({unique: true})
    public name: string;

    @OneToMany(() => Movie, movie => movie.quality)
    movies: Movie[];

}

export default Quality
