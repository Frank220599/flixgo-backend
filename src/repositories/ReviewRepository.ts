import CrudRepository from "./base/CrudRepository";
import Review from "../database/entities/Review";

class ReviewRepository extends CrudRepository<Review> {
    constructor() {
        super('Review');
    }

}


export default ReviewRepository