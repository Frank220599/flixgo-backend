import {Entity, Column} from "typeorm";
import Movie from "./Movie";
import {BaseEntity} from "./core/BaseEntity";


@Entity()
class Quality extends BaseEntity {

    @Column({unique: true})
    public name: string;

    // @HasMany(() => Movie)
    // movies: Movie[];

}

export default Quality