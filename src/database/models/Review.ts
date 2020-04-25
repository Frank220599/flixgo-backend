import {Model, Table, Column, AllowNull, Default, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import Movie from "./Movie";

@Table({timestamps: true, paranoid: true})
class Review extends Model<Review> {
    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    text: string;

    @AllowNull(false)
    @Column
    rating: number;

    @Default(0)
    @Column
    like: number;

    @Default(0)
    @Column
    dislike: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number;

    @ForeignKey(() => Movie)
    @AllowNull(false)
    @Column
    movieId: number;

    //use for include option
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Movie)
    movie: Movie;


}

export default Review