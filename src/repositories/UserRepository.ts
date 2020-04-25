import CrudRepository from "./base/CrudRepository";
import User from "../database/models/User";

class UserRepository extends CrudRepository<User> {
    constructor() {
        super('User');
    }
}


export default UserRepository