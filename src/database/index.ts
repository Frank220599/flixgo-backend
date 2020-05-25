import {createConnection, Connection} from "typeorm";

const db: () => Promise<Connection> = async () => await createConnection();

export default db
