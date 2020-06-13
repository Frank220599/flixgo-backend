import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import Quality from "../entities/Quality";
const qualities = ['hd', 'full hd', '1080', '720', '480'];

export default class CreateQualities implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Quality)
            .values(qualities.map(quality => ({name: quality})))
            .execute()
    }
}
