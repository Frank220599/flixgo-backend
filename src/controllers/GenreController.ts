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
    NotFoundError,
} from "routing-controllers"
import {getCustomRepository} from "typeorm"

import {GenreRepository} from "../repositories/GenreRepository";
import {GenreDTO} from "../dto";


@JsonController("/genres")
export class GenreController {

    private readonly repository = getCustomRepository(GenreRepository);

    @Get("/")
    public async getGenres(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const genres = await this.repository.findAndCount(req);
            return await res.json(genres)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getGenre(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.findById(id);
            if (!genre) {
                res.statusCode = 404;
                throw new NotFoundError('Genre not found!')
            }
            return await res.json({
                data: genre,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Post("/")
    public async createGenre(@Body() newGenre: GenreDTO, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.create(newGenre);
            return await res.status(201).json({
                data: genre,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateGenre(@Param("id") id: number, @Body() newValues: GenreDTO, @Res() res: Response): Promise<any> {
        try {
            const genre = await this.repository.update(id, newValues);
            return await res.json({
                data: genre,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteGenre(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            await this.repository.delete(id);
            return await res.json({
                genre: id,
                msg: 'Genre deleted successfully!'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}

