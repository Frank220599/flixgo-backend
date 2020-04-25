import {Model, Table, Column, AllowNull, Unique, HasMany} from "sequelize-typescript";
import Movie from "./Movie";


@Table({timestamps: true, paranoid: true})
class Quality extends Model<Quality> {

    @Unique
    @AllowNull(false)
    @Column
    public name: string;

    @HasMany(() => Movie)
    movies: Movie[];

}

export default Quality