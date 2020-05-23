import {Response, Request} from "express";
import {Delete, Get, JsonController, Param, Put, Res, Authorized, Req, Body} from "routing-controllers";
import {getCustomRepository} from "typeorm"
import UserRepository from "../repositories/UserRepository";

export interface IRequest extends Request {
    query: {
        page: number,
        limit: number
    }
}


@JsonController('/users')
export class UserController {

    private readonly repository = getCustomRepository(UserRepository);

    @Get("/")
    public async getUsers(@Res() res: Response, @Req() req: IRequest): Promise<any> {
        try {
            const users = await this.repository.findAndCount(req);
            return await res.json(users)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get('/:id')
    public async getUser(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.findById(id);
            return await res.json(user);
        } catch (e) {
            return res.status(e.httpCode || 200).json(e)
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateUser(@Body() values: object, @Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.update(id, values);
            return await res.json(user)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteUser(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.delete(id);
            return await res.json({
                user: id,
                msg: 'User deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

