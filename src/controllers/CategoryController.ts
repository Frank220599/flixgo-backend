import {Response, Request} from "express";
import {
    Get,
    JsonController,
    Param,
    Req,
    Res,
    NotFoundError,
    Post,
    Body,
    CurrentUser,
    Authorized
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import slugify from "slugify";

import AnnouncementRepository from "../repositories/AnnouncementRepository";
import AnnouncementDTO from "../dto/AnnouncementDTO";
import User from "../database/entities/User";

@JsonController("/announcements")
export class AnnouncementController {

    private readonly repository = getCustomRepository(AnnouncementRepository);

    @Get("/json")
    public async get(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findFromJson();
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/")
    public async getAll(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getOne(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const data = await this.repository.findById(id);
            if (!data) {
                res.statusCode = 404;
                throw new NotFoundError('announcement not found');
            }
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Post("/")
    public async create(
        @CurrentUser() user: User,
        @Body() newAnnouncement: AnnouncementDTO,
        @Res() res: Response
    ): Promise<any> {
        try {
            const data = await this.repository.create({
                ...newAnnouncement,
                authorId: user.id,
                slug: slugify(newAnnouncement.title)
            });
            if (!data) {
                res.statusCode = 404;
                throw new NotFoundError('announcement not found');
            }
            return await res.json(data)
        } catch (error) {
            if (error.httpCode) {
                return res.status(error.httpCode).json({error})
            }
            return res.json({error: error.message})
        }
    }
}

