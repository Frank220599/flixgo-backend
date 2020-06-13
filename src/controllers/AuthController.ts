import {Body, JsonController, Post, Res, Authorized, CurrentUser, Get, Req, Put, HttpError} from "routing-controllers";
import {Response, Request} from "express";
import {getCustomRepository} from "typeorm"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import uniqid from 'uniqid'

import {PasswordDTO, SigninDTO, SignupDTO} from "../dto";
import UserRepository from "../repositories/UserRepository";
import sendMail from "../utils/sendMail";
import User from "../database/entities/User";


@JsonController('/auth')
export class AuthController {
    private readonly repository = getCustomRepository(UserRepository);

    @Post("/signup")
    public async Signup(@Body() newUser: SignupDTO, @Res() res: Response): Promise<any> {
        try {
            const isUserExist = await this.repository.findByEmail(newUser.email);

            if (isUserExist) {
                res.statusCode = 409;
                throw new HttpError(409, 'This email already exist!')
            }
            const hashedPassword = await bcrypt.hash(newUser.password, 12);

            const user = await this.repository.create({
                ...newUser,
                password: hashedPassword,
            });

            return await res.status(201).json({user})

        } catch (error) {
            return res.json({error})
        }
    }

    @Post('/signin')
    public async Signin(@Body() userBody: SigninDTO, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.getUserWithPassword(userBody.email);

            if (!user) {
                res.statusCode = 409;
                throw new HttpError(409, 'Incorrect Login or password!')
            }

            const isEqual = await bcrypt.compare(userBody.password, user.password);
            if (!isEqual) {
                res.statusCode = 401;
                throw new Error('Incorrect Login or password!')
            }
            const token = await jwt.sign({
                email: user.email,
                userId: user.id,
            }, 'secret', {expiresIn: '100h'});
            return await res.json({
                token,
                user,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Get('/authenticate')
    public async Authenticate(@CurrentUser() user: User, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            return await res.json({
                data: user
            })
        } catch (error) {
            return res.json({error})
        }
    }


    @Authorized()
    @Put('/change-password')
    public async ChangePassword(@CurrentUser() user: User, @Body() passwords: PasswordDTO, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const userWithPass = await this.repository.getUserWithPassword(user.email);
            const isEqual = await bcrypt.compare(passwords.oldPassword, userWithPass.password);
            if (!isEqual) {
                res.statusCode = 400;
                throw new Error('Incorrect old password try again!')
            }
            const hashedPassword = await bcrypt.hash(passwords.newPassword, 12);

            await this.repository.update(userWithPass.id, {password: hashedPassword});

            return await res.json({
                msg: 'Password changed successfully'
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Post('/reset-password')
    public async ForgotPassword(@CurrentUser() user: User, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const newPassword = await uniqid.time();
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await this.repository.update(user.id, {password: hashedPassword});
            await sendMail({
                from: '"FlixGo 👻" <foo@example.com>',
                to: 'mr.frank220599@gmail.com',
                subject: 'Password Reset FlixGo',
                text: `Your new password for FlixGo is ${newPassword} you can change it in profile settings!`
            });
            return await res.json({
                msg: 'Password changed successfully'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}


