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

import GenreRepository from "../repositories/GenreRepository";


@JsonController("/genres")
export class GenreController {

    private readonly repository = new GenreRepository();

    @Get("/")
    public async getGenres(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const genres = await this.repository.findAndCount(req);
            return await res.json({
                genres,
                msg: "Genres fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getGenre(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.findById(id);
            return await res.json({
                genre,
                msg: "Genres fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    // @Authorized()
    @Post("/")
    public async createGenre(@Body() newGenre, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.create({
                ...newGenre,
            });
            return await res.status(201).json({
                genre,
                msg: 'Genre created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateGenre(@Param("id") id: number, @Body() newValues, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.update(newValues, {where: {id}});
            return await res.json({
                genre,
                msg: 'Genre updated successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteGenre(@Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.delete({where: {id}});
            return await res.json({
                genre: id,
                msg: 'Genre deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

