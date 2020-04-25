import CrudRepository from "./base/CrudRepository";
import Review from "../database/models/Review";

class MovieRepository extends CrudRepository<Review> {
    constructor() {
        super('Movie');
    }
}


export default MovieRepository