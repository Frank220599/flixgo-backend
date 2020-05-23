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
import MovieRepository from "../repositories/MovieRepository";


@JsonController("/movies")
export class MovieController {

    private readonly repository = new MovieRepository();

    @Get("/")
    public async getMovies(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);
            return await res.json(data)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getMovie(@Param('id') id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.findOne(req, {where: {id}});
            return await res.json(movie)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Post("/")
    public async createMovie(@CurrentUser() user: User, @Body() newMovie, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.create(newMovie);
            return await res.status(201).json({
                movie,
                msg: 'Movie created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized('Admin')
    @Put('/:id')
    public async updateMovie(@CurrentUser() user: User, @Param("id") id: number, @Body() newValues,
                             @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.update(newValues, {where: {id, userId: user.id}});
            return await res.json(movie)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteMovie(@CurrentUser() user: User, @Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const movie = await this.repository.delete({where: {id, userId: user.id}});
            return await res.json(id)
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

