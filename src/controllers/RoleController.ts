import {Request, Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
} from "routing-controllers"

import User from "../database/entities/User";
import RoleRepository from "../repositories/RoleRepository";


@JsonController("/roles")
export class RoleController {

    private readonly repository = new RoleRepository();

    @Get("/")
    public async getRoles(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);
            return await res.json({
                roles: data,
                msg: "Roles fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getRole(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.findById(id, {include: [User]});
            return await res.json({
                role,
                msg: "Roles fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    // @Authorized()
    @Post("/")
    public async createRole(@CurrentUser() user: User, @Body() newRole, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.create(newRole);
            return await res.status(201).json({
                role,
                msg: 'Role created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateRole(@CurrentUser() user: User, @Param("id") id: number, @Body() newValues,
                            @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.update(newValues, {where: {id, userId: user.id}});
            return await res.json({
                role,
                msg: 'Role updated successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteRole(@CurrentUser() user: User, @Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.delete({where: {id, userId: user.id}});
            return await res.json({
                role: id,
                msg: 'Role deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

