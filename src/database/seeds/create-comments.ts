import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import Comment from "../entities/Comment";

export default class CreateComments implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Comment)().createMany(10)
    }
}