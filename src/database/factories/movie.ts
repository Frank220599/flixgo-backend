import {define} from "typeorm-seeding";
import Movie from "../entities/Movie";


define(Movie, (faker, context: { roles: string[] }) => {
    const movie = new Movie();
    movie.title = faker.lorem.words();
    movie.description = faker.lorem.sentences();
    movie.cover = faker.image.imageUrl();
    movie.country = faker.address.country();
    movie.releaseYear = 1920 + Math.floor(Math.random() * 100);
    movie.age = 16;
    movie.duration = 120;
    return movie
});