import {Model, Table, Column, AllowNull, HasMany, BelongsTo, Default, ForeignKey} from "sequelize-typescript";
import Review from "./Review";
import Comment from "./Comment";
import Genre from "./Genre";
import Photo from "./Photo";
import Quality from "./Quality";

@Table({timestamps: true, paranoid: true})
class Movie extends Model<Movie> {
    @AllowNull(false)
    @Column
    public title: string;

    @AllowNull(false)
    @Column
    public description: string;

    @AllowNull(false)
    @Column
    public duration: number;

    @Default(0)
    @AllowNull(false)
    @Column
    public rating: number;

    @AllowNull(false)
    @Column
    public cover: string;

    @Default(0)
    @Column
    like: number;

    @Default(0)
    @Column
    dislike: number;

    @AllowNull(false)
    @Column
    releaseYear: number;

    @AllowNull(false)
    @Column
    age: number;

    @AllowNull(false)
    @Column
    country: number;

    @Default(0)
    @AllowNull(false)
    @Column
    public status: number;

    @ForeignKey(() => Genre)
    @AllowNull(false)
    @Column
    genreId: number;

    @ForeignKey(() => Quality)
    @AllowNull(false)
    @Column
    qualityId: number;

    @BelongsTo(() => Genre)
    genre: Genre;

    @HasMany(() => Photo)
    photos: Photo[];

    @HasMany(() => Review)
    reviews: Review[];

    @HasMany(() => Comment)
    comments: Comment[]

}

export default Movie