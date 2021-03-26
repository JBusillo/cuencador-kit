import mysqlx from "@mysql/xdevapi";
import { readFileSync } from 'fs'
import { dev, browser } from '$app/env';


if (!browser) {
    dbInit()
}

let _client = null;

async function dbInit() {
    let env = dev ? "dev" : "prod"
    let json = readFileSync(`/var/secrets/database.config.${env}.json`)
    let databaseConfig = JSON.parse(json)

    try {
        _client = await mysqlx.getClient(
            `mysqlx://${databaseConfig.sqlUser}:${databaseConfig.sqlPassword}@${databaseConfig.sqlHost}:33060/${databaseConfig.sqlDatabase}`,
            { pooling: { maxSize: 1, maxIdleTime: 1000, queueTimeout: 2000 } }
        );
        console.log("NoSql Pool Initialized");
        return _client;
    } catch (err) {
        console.log("NoSql caught: " + err);
    }
}

export async function getSession() {
    try {
        return await _client.getSession();
    } catch (err) {
        console.log("NoSql caught: " + err);
    }
}