import {EntityRepository} from "typeorm"

import CrudRepository from "../utils/CrudRepository";
import Movie from "../database/entities/Movie";
import {MovieDTO} from "../dto";

@EntityRepository(Movie)
class MovieRepository extends CrudRepository<Movie, MovieDTO> {

}

export default MovieRepository
