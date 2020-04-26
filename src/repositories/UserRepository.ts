import CrudRepository from "./base/CrudRepository";
import User from "../database/entities/User";

class UserRepository extends CrudRepository<User> {
    constructor() {
        super(User);
    }
}


export default UserRepository