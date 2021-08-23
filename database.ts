import { ConnectionOptions, createConnection } from "typeorm";

export default class Database {
    static async initDatabase() {
        const ormConfigOptions: ConnectionOptions = {
            "name": "default",
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "test1234",
            "database": "messagingSandbox",
            "synchronize": false,
            "entities": ["models/*.ts"]
        };
        const connection = await createConnection(ormConfigOptions);
        if (connection) {
            console.log("Database connected");
            return connection;
        } else (
            console.log("ERROR WITH DATABASE CONNECTION")
        )
    }
}