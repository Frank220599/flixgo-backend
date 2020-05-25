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

import MovieRepository from "../repositories/MovieRepository";
import {MovieDTO} from "../dto";


@JsonController("/movies")
export class MovieController {

    private readonly repository = getCustomRepository(MovieRepository);

    @Get("/")
    public async getMovies(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const movies = await this.repository.findAndCount(req);
            return await res.json(movies)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getMovie(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.findById(id);
            if (!movie) {
                res.statusCode = 404;
                throw new NotFoundError('Movie not found!')
            }
            return await res.json({
                movie,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Post("/")
    public async createMovie(@Body() newMovie: MovieDTO, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.create(newMovie);
            return await res.status(201).json({
                movie,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateMovie(@Param("id") id: number, @Body() newValues: object, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.update(id, newValues);
            return await res.json({
                movie,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteMovie(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            await this.repository.delete(id);
            return await res.json({
                movie: id,
                msg: 'Movie deleted successfully!'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}

