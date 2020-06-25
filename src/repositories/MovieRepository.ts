import {EntityRepository} from "typeorm"

import CrudRepository from "../utils/CrudRepository";
import Movie from "../database/entities/Movie";
import {MovieDTO} from "../dto";
import Genre from "../database/entities/Genre";
import Paginate from "../utils/paginate";


@EntityRepository(Movie)
class MovieRepository extends CrudRepository<Movie, MovieDTO> {

    async findAndCount(req: any): Promise<any> {
        const {filter, page, limit} = req.query;


        const qb = this.repository.createQueryBuilder('movie');
        qb.leftJoinAndSelect('movie.genres', 'genre');

        if (filter) {
            if (filter.id) {
                qb.andWhere('movie.id = :id', {id: filter.id});
            }

            if (filter.genre) {
                qb.andWhere('genre.id = :genreId', {genreId: filter.genre.id})
            }

            if (filter.country) {
                qb.andWhere('movie.country = :country', {country: filter.country})
            }

            if (filter.quality) {
                qb.andWhere('movie.quality = :quality', {quality: filter.quality.id})
            }

            if (filter.quality) {
                qb.andWhere('movie.qualityId = :qualityId', {qualityId: filter.quality.id})
            }

            if (filter.title) {
                qb.andWhere('movie.title LIKE :title', {title: "%" + filter.title.like + "%"})
            }

            if (filter.rating) {
                qb.andWhere('movie.rating BETWEEN :ratingFrom AND :ratingTo', {
                    ratingFrom: filter.rating.from,
                    ratingTo: filter.rating.to
                })
            }

            if (filter.releaseYear) {
                qb.andWhere('movie.releaseYear BETWEEN :from AND :to', {
                    from: filter.releaseYear.from,
                    to: filter.releaseYear.to
                })
            }

        }

        qb.leftJoinAndSelect('movie.genres', 'genres');

        qb.skip(+(limit * (page - 1)) || 0).take(+limit || 50);

        const res = await qb.getMany();


        return {
            data: res,
            _metadata: Paginate(req, res.length)
        }
    }

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
