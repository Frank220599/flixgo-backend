import {AbstractRepository, EntityRepository} from "typeorm"
import Genre from "../database/entities/Genre";
import {IRequest} from "../controllers/UserController";
import queryBuilder from "../utils/queryBuilder";
import Paginate from "../utils/paginate";

@EntityRepository(Genre)
class GenreRepository extends AbstractRepository<Genre> {
    public async findAndCount(req: IRequest): Promise<{ data: Genre[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<Genre> {
        const result = await this.repository.findOne(id, {
            relations: ['user']
        });
        if (!result) {
            throw new Error('Genre not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<Genre> {
        const result: Genre = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }

}

export default GenreRepository
