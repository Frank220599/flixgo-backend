import {EntityRepository} from "typeorm"

import CrudRepository from "../utils/CrudRepository";
import Movie from "../database/entities/Movie";
import {MovieDTO} from "../dto";
import Genre from "../database/entities/Genre";

@EntityRepository(Movie)
class MovieRepository extends CrudRepository<Movie, MovieDTO> {

    async create(newEntity: MovieDTO): Promise<Movie> {
        const movie = await super.create(newEntity);

        newEntity.genres.forEach(genreId => {
            const genre = new Genre();
            genre.id = genreId;
            movie.genres.push(genre);
        });

        await this.repository.save(movie);

        return this.repository.findOne(movie.id)
    }


}

export default MovieRepository
