import {AbstractRepository, EntityRepository} from "typeorm"
import {IRequest} from "../controllers/UserController";
import Comment from "../database/entities/Comment";
import queryBuilder from "../utils/queryBuilder";
import Paginate from "../utils/paginate";

@EntityRepository(Comment)
class CommentRepository extends AbstractRepository<Comment> {
    public async findAndCount(req: IRequest): Promise<{ data: Comment[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<Comment> {
        const result = await this.repository.findOne(id, {
            relations: ['user']
        });
        if (!result) {
            throw new Error('Comment not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<Comment> {
        const result: Comment = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }
}

export default CommentRepository
