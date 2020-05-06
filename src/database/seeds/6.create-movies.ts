import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import Movie from "../entities/Movie";

export default class CreateMovie implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Movie)().createMany(100)
    }
}
