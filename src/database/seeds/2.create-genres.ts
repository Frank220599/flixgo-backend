import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import Genre from "../entities/Genre";
const genres = ["Action/Adventure", "Animals", "Animation", "Biography", "Comedy", "Cooking", "Dance", "Documentary", "Drama", "Education", "Entertainment", "Family", "Fantasy", "History", "Horror", "Independent", "International", "Kids", "Kids & Family", "Medical", "Military/War", "Music", "Musical", "Mystery/Crime", "Nature", "Paranormal", "Politics", "Racing", "Romance", "Sci-Fi/Horror", "Science",
    "Science Fiction", "Science/Nature", "Spanish", "Travel", "Western"];

export default class CreateGenres implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Genre)
            .values(genres.map(genre => ({name: genre})))
            .execute()
    }
}