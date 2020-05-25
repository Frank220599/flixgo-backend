import {EntityRepository} from "typeorm"
import User from "../database/entities/User";
import {SignupDTO} from "../dto";
import CrudRepository from "../utils/CrudRepository";

@EntityRepository(User)
class UserRepository extends CrudRepository<User, SignupDTO> {

    public async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({
            where: {email},
            relations: ['comments', 'subscription']
        })
    }

    public async getUserWithPassword(email: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .innerJoinAndSelect('user.role', 'role', )
            .innerJoinAndSelect('user.subscription', 'subscription')
            .addSelect('user.password')
            .getOne();
    }
}


export default UserRepository
