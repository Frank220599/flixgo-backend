import {Model, Table, Column, AllowNull, Unique, ForeignKey, BelongsTo} from "sequelize-typescript";
import Movie from "./Movie";


@Table({timestamps: true, paranoid: true})
class Photo extends Model<Photo> {

    @Unique
    @AllowNull(false)
    @Column
    public name: string;

    @ForeignKey(() => Movie)
    @AllowNull(false)
    @Column
    movieId: number;

    @BelongsTo(() => Movie)
    movies: Movie;

}

export default Photo