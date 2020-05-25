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
    CurrentUser,
} from "routing-controllers"
import {getCustomRepository} from "typeorm"

import CommentRepository from "../repositories/CommentRepository";
import {CommentDTO} from "../dto";
import User from "../database/entities/User";


@JsonController("/comments")
export class CommentController {

    private readonly repository = getCustomRepository(CommentRepository);

    @Get("/")
    public async getComments(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const comments = await this.repository.findAndCount(req);
            return await res.json(comments)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getComment(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.findById(id);
            if (!comment) {
                res.statusCode = 404;
                throw new NotFoundError('Comment not found!')
            }
            return await res.json({
                comment,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Post("/")
    public async createComment(@CurrentUser() user: User, @Body() newComment: CommentDTO, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.create({...newComment, userId: user.id});
            return await res.status(201).json({
                data: comment,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateComment(@Param("id") id: number, @Body() newValues: CommentDTO, @Res() res: Response): Promise<any> {
        try {
            const comment = await this.repository.update(id, newValues);
            return await res.json({
                comment,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized(['Admin', 'Moderator'])
    @Delete('/:id')
    public async deleteComment(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            await this.repository.delete(id);
            return await res.json({
                comment: id,
                msg: 'Comment deleted successfully!'
            })
        } catch (error) {
            return res.json({error})
        }
    }
}

