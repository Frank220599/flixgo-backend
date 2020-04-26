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
import CommentRepository from "../repositories/CommentRepository";


@JsonController("/comments")
export class CommentController {

    private readonly repository = new CommentRepository();

    @Get("/")
    public async getComments(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const comments = await this.repository.findAndCount(req);
            return await res.json({
                comments,
                msg: "Comments fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getComment(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.findById(id, {include: [User]});
            return await res.json({
                comment,
                msg: "Comments fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    // @Authorized()
    @Post("/")
    public async createComment(@CurrentUser() user: User, @Body() newComment, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.create({
                ...newComment,
                userId: 1
            });
            return await res.status(201).json({
                comment,
                msg: 'Comment created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateComment(@CurrentUser() user: User, @Param("id") id: number, @Body() newValues,
                               @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.update(newValues, {where: {id, userId: user.id}});
            return await res.json({
                comment,
                msg: 'Comment updated successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteComment(@CurrentUser() user: User, @Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.delete({where: {id, userId: user.id}});
            return await res.json({
                comment: id,
                msg: 'Comment deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

