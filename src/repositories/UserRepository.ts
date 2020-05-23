import {AbstractRepository, EntityRepository} from "typeorm"
import {NotFoundError} from "routing-controllers"
import User from "../database/entities/User";
import queryBuilder from "../utils/queryBuilder";
import {IRequest} from "../controllers/UserController";
import Paginate from "../utils/paginate";


@EntityRepository(User)
class UserRepository extends AbstractRepository<User> {

    public async findAndCount(req: IRequest): Promise<{ data: User[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(queryBuilder(req, true));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async findById(id: number): Promise<User> {
        const result = await this.repository.findOne(id, {
            relations: ['comments', 'subscription']
        });
        if (!result) {
            throw new NotFoundError('User not found!')
        }
        return result
    }

    public async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    public async update(id: number, newValues: object): Promise<User> {
        const result: User = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }

    public async findByEmail(email: string): Promise<User> {
        const result = await this.repository.findOne({
            where: {
                email
            },
            relations: ['comments', 'subscription']
        });
        if (!result) {
            throw new Error('User not found!')
        }
        return result
    }

    async create(param: { firstName: string; lastName: string; password: string; email: string }) {
        const user = new User();
        user.firstName = param.firstName;
        user.lastName = param.lastName;
        user.password = param.password;
        user.email = param.email;
        return await this.repository.save(user);
    }

    public async getUserWithPassword(email: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .addSelect('user.password')
            .getOne();
    }
}


export default UserRepository
