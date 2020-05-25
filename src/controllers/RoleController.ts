import {Request, Response} from "express";
import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
} from "routing-controllers"
import {getCustomRepository} from "typeorm"
import RoleRepository from "../repositories/RoleRepository";
import {RoleDTO} from "../dto";


@JsonController("/roles")
export class RoleController {

    private readonly repository = getCustomRepository(RoleRepository);

    @Get("/")
    public async getRoles(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const roles = await this.repository.findAndCount(req);
            return await res.json(roles)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getRole(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.findById(id);
            return await res.json({data: role})
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Post("/")
    public async createRole(@Body() newRole: RoleDTO, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.create(newRole);
            return await res.status(201).json({data: role})
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateRole(@Param("id") id: number, @Body() newValues: RoleDTO, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.update(id, newValues);
            return await res.json({data: role})
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteRole(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {

            await this.repository.delete(id);

            return await res.json({
                role: id,
                msg: 'Role deleted successfully!'
            })

        } catch (error) {
            return res.json({error})
        }
    }
}

