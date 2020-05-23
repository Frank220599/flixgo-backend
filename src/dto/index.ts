import {Response} from "express"
import {BadRequestError} from "routing-controllers"
import {IsEmail, Length, validate,} from 'class-validator';

export const validationOptions = {
    skipNullProperties: false,
    skipUndefinedProperties: false,
    forbidUnknownValues: true,
    validationError: {
        value: false,
        target: false
    }
};

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


