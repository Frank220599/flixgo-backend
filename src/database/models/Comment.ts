import {Model, Table, Column, AllowNull, Default, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import Movie from "./Movie";

@Table({timestamps: true, paranoid: true})
class Comment extends Model<Comment> {
    @Column
    public parentId: number;

    @AllowNull(false)
    @Column
    public text: string;

    @Default(0)
    @Column
    public like: number;

    @Default(0)
    @Column
    public dislike: number;

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

export default Comment