import {IsEmail, MinLength} from "class-validator";

export class TodoValidator {
    @MinLength(6)
    title?: String;

    completed?: boolean
}

export class SingupValidator {

    @IsEmail()
    email: string;

    @MinLength(1)
    private firstName: string;

    @MinLength(6)
    password: string;
}

export class LoginValidator {

    @IsEmail()
    email: string;

    password: string;
}