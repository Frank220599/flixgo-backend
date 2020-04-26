import CrudRepository from "./base/CrudRepository";
import Comment from "../database/entities/Comment";

class CommentRepository extends CrudRepository<Comment> {
    constructor() {
        super(Comment);
    }
}

export default CommentRepository