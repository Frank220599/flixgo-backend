import {Seeder, Factory} from "typeorm-seeding";
import {Connection} from "typeorm";
import User from "../entities/User";
import Role from "../entities/Role";

export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                { name: 'Admin' },
                { name: 'Moderator' },
                { name: 'User' },
            ])
            .execute()
    }
}