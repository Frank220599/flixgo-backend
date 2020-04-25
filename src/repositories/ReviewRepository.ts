import CrudRepository from "./base/CrudRepository";
import Review from "../database/models/Review";

class ReviewRepository extends CrudRepository<Review> {
    constructor() {
        super('Review');
    }

}


export default ReviewRepository