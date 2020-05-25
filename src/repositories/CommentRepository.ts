import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Comment from "../database/entities/Comment";
import {CommentDTO} from "../dto";

@EntityRepository(Comment)
class CommentRepository extends CrudRepository<Comment, CommentDTO> {
}

export default CommentRepository
