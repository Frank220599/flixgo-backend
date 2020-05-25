import {EntityRepository} from "typeorm"
import Review from "../database/entities/Review";
import CrudRepository from "../utils/CrudRepository";
import {ReviewDTO} from "../dto";

@EntityRepository(Review)
export class ReviewRepository extends CrudRepository<Review, ReviewDTO> {

}


