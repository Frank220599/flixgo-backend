import {define, factory} from "typeorm-seeding";
import User from "../entities/User";

define(User, (faker, context: { roles: string[] }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = faker.internet.email();
    user.password = faker.random.word();
    user.roleId = 3;
    user.subscriptionId = 1;
    return user
});
