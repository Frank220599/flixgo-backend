import {EntityRepository} from "typeorm"

import Genre from "../database/entities/Genre";
import CrudRepository from "../utils/CrudRepository";
import {GenreDTO} from "../dto";

@EntityRepository(Genre)
export class GenreRepository extends CrudRepository<Genre, GenreDTO> {

}

