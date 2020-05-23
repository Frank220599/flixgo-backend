import {AbstractRepository, EntityRepository} from "typeorm"
import Role from "../database/entities/Role";
import {IRequest} from "../controllers/UserController";
import queryBuilder from "../utils/queryBuilder";
import Paginate from "../utils/paginate";

@EntityRepository(Role)
class RoleRepository extends AbstractRepository<Role> {
    public async findAndCount(req: IRequest): Promise<{ data: Role[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<Role> {
        const result = await this.repository.findOne(id, {
            relations: ['user']
        });
        if (!result) {
            throw new Error('Role not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<Role> {
        const result: Role = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }
}


export default RoleRepository
