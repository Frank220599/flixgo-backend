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

import User from "../database/models/User";
import ReviewRepository from "../repositories/ReviewRepository";


@JsonController("/reviews")
export class ReviewController {

    private readonly repository = new ReviewRepository();

    @Get("/")
    public async getReviews(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCountAll(req);
            return await res.json({
                roles: data,
                msg: "Reviews fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getReview(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.findByPk(id, {include: [User]});
            return await res.json({
                role,
                msg: "Reviews fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Post("/")
    public async createReview(@CurrentUser() user: User, @Body() newReview, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.create({
                ...newReview,
                userId: user.id
            });
            return await res.status(201).json({
                role,
                msg: 'Review created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateReview(@CurrentUser() user: User, @Param("id") id: number, @Body() newValues,
                            @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.update(newValues, {where: {id, userId: user.id}});
            return await res.json({
                role,
                msg: 'Review updated successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteReview(@CurrentUser() user: User, @Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.delete({where: {id, userId: user.id}});
            return await res.json({
                role: id,
                msg: 'Review deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

