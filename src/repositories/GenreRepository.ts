import CrudRepository from "../base/CrudRepository";
import Genre from "../database/entities/Genre";

class GenreRepository extends CrudRepository<Genre> {
    constructor() {
        super(Genre);
    }
}

export default GenreRepository