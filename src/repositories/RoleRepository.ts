import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Role from "../database/entities/Role";
import {RoleDTO} from "../dto";

@EntityRepository(Role)
class RoleRepository extends CrudRepository<Role, RoleDTO> {

}


export default RoleRepository
