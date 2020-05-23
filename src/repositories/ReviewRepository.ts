import {AbstractRepository, EntityRepository} from "typeorm"
import Review from "../database/entities/Review";
import {IRequest} from "../controllers/UserController";
import queryBuilder from "../utils/queryBuilder";
import Paginate from "../utils/paginate";

@EntityRepository(Review)
class ReviewRepository extends AbstractRepository<Review> {
    public async findAndCount(req: IRequest): Promise<{ data: Review[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<Review> {
        const result = await this.repository.findOne(id, {
            relations: ['user']
        });
        if (!result) {
            throw new Error('Review not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<Review> {
        const result: Review = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }
}


export default ReviewRepository
