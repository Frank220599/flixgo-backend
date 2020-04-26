import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import Subscription from "../entities/Subscription";

export default class CreateSubscriptions implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Subscription)
            .values([
                {name: 'Basic', cost: 'Free'},
                {name: 'Premium', cost: '$19.99'},
                {name: 'Cinematic', cost: '$39.99'},
            ])
            .execute()
    }
}