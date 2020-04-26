import {Delete, Get, JsonController, Param, Put, Res, Authorized, Req} from "routing-controllers";
import {Response, Request} from "express";
import UserRepository from "../repositories/UserRepository";

@JsonController('/users')
export class UserController {

    private readonly repository = new UserRepository();

    @Get("/")
    public async getUsers(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const users = await this.repository.findAndCount(req);
            return await res.json({
                users,
                msg: "Users fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get('/:id')
    public async getUser(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.findById(id, {attributes: {exclude: ['password']}});
            return await res.json({
                user,
                msg: "Users fetched successfully!"
            });
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Put('/:id')
    public async updateUser(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.findById(id);
            return await res.json({
                user,
                msg: 'User fetched successfully!'
            })
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
            const user = await this.repository.findById(id);
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

