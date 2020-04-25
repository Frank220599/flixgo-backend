import CrudRepository from "./base/CrudRepository";
import Role from "../database/models/Role";

class RoleRepository extends CrudRepository<Role> {
    constructor() {
        super('Role');
    }
}


export default RoleRepository