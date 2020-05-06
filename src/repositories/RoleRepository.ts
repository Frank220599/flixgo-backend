import CrudRepository from "../base/CrudRepository";
import Role from "../database/entities/Role";

class RoleRepository extends CrudRepository<Role> {
    constructor() {
        super('Role');
    }
}


export default RoleRepository