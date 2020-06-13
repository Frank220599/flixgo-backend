import {Response, Request} from "express";
import {Delete, Get, JsonController, Param, Put, Res, Authorized, Req, Body, NotFoundError} from "routing-controllers";
import {getCustomRepository} from "typeorm"
import UserRepository from "../repositories/UserRepository";
import {UserDTO} from "../dto";


@JsonController('/users')
export class UserController {

    private readonly repository = getCustomRepository(UserRepository);

    @Get("/")
    public async getUsers(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const users = await this.repository.findAndCount(req);
            return await res.json(users)
        } catch (error) {
            return res.json({error})
        }
    }


    @Get('/:id')
    public async getUser(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.findById(id);
            if (!user) {
                res.statusCode = 404;
                throw new NotFoundError('User not found!')
            }
            console.log(user)
            return await res.json({data: user});
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateUser(@Body({
        validate: {skipMissingProperties: true}
    }) values: UserDTO, @Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.update(id, values);
            return await res.json({data: user})
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteUser(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            await this.repository.delete(id);
            return await res.json({
                user: id,
                msg: 'User deleted successfully!'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}

