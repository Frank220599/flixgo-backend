import {AbstractRepository, EntityRepository} from "typeorm"
import Movie from "../database/entities/Movie";
import {IRequest} from "../controllers/UserController";
import queryBuilder from "../utils/queryBuilder";
import Paginate from "../utils/paginate";

@EntityRepository(Movie)
class MovieRepository extends AbstractRepository<Movie> {
    public async findAndCount(req: IRequest): Promise<{ data: Movie[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<Movie> {
        const result = await this.repository.findOne(id, {
            relations: ['user']
        });
        if (!result) {
            throw new Error('Movie not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<Movie> {
        const result: Movie = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }
}


export default MovieRepository
