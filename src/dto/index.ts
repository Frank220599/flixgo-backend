import {IsEmail, Length, IsNotEmpty, IsOptional, IsBoolean, IsBase64, IsArray} from 'class-validator';

export class SigninDTO {

    @IsEmail()
    email: string;

    @Length(6, 20)
    password: string;

}

export class SignupDTO extends SigninDTO {

    @Length(2, 20)
    firstName: string;

    @Length(2, 20)
    lastName: string;

}

export class PasswordDTO {

    @Length(6, 20)
    oldPassword: string;

    @Length(6, 20)
    newPassword: string;

}

export class UserDTO {

    @IsEmail()
    email: string;

    @Length(2, 20)
    firstName: string;

    @Length(2, 20)
    lastName: string;

    @IsBoolean()
    status: boolean;

    @Length(2, 20)
    userName: string;

}

export class GenreDTO {

    @Length(2, 20)
    name: string;

}

export class CommentDTO {

    @Length(2, 20)
    text: string;

    @IsNotEmpty()
    movieId: number;

    @IsOptional()
    parentId: number;

    userId: number;

}

export class ReviewDTO {

    @Length(2, 20)
    title: string;

    @Length(2, 20)
    text: string;

    @IsNotEmpty()
    movieId: number;

    userId: number;

}

export class RoleDTO {

    @Length(2, 20)
    name: string;

}

export class MovieDTO {

    @Length(2, 20)
    title: string;

    @Length(2, 20)
    description: string;

    @IsNotEmpty()
    duration: number;


    cover: any;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    releaseYear: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    qualityId: number;

    @IsArray()
    genres: Array<number>;

    rating: number;

    status: boolean;

    like: number;

    dislike: number;

    genreId: number;

}


