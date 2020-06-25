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
import {getCustomRepository} from "typeorm"
import User from "../database/entities/User";
import {ReviewRepository} from "../repositories/ReviewRepository";
import {ReviewDTO} from "../dto";


@JsonController("/reviews")
export class ReviewController {

    private readonly repository = getCustomRepository(ReviewRepository);

    @Get("/")
    public async getReviews(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const roles = await this.repository.findAndCount(req);
            return await res.json(roles)
        } catch (error) {
            return res.json({error});
        }
    }

    @Get("/:id")
    public async getReview(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.findById(id);
            return await res.json({
                data: role,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Post("/")
    public async createReview(@CurrentUser() user: User, @Body() newReview: ReviewDTO, @Res() res: Response): Promise<any> {
        try {
            const result = await this.repository.create({
                ...newReview,
                userId: user.id
            });

            const review = await this.repository.findById(result.id, {relations: ['user']});

            return await res.status(201).json({
                data: review,
            })

        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateReview(@Param("id") id: number, @Body() newValues: object, @Res() res: Response): Promise<any> {
        try {
            const role = await this.repository.update(id, newValues);
            return await res.json({
                data: role,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteReview(@Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            await this.repository.delete(id);
            return await res.json({
                role: id,
                msg: 'Review deleted successfully!'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}

