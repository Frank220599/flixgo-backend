import CrudRepository from "./base/CrudRepository";
import Comment from "../database/models/Comment";

class CommentRepository extends CrudRepository<Comment> {
    constructor() {
        super('Comment');
    }
}

export default CommentRepository