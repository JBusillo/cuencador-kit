import mysqlx from "@mysql/xdevapi";
import { readFileSync } from 'fs'
import { dev } from '$app/env';

let _client = null;

export async function dbInit() {
    let env = dev ? "dev" : "prod"
    let json = readFileSync(`/var/secrets/database.config.${env}.json`)
    let databaseConfig = JSON.parse(json)

    try {
        _client = await mysqlx.getClient(
            `mysqlx://${databaseConfig.sqlUser}:${databaseConfig.sqlPassword}@${databaseConfig.sqlHost}:33060/${databaseConfig.sqlDatabase}`,
            { pooling: { maxSize: 20, maxIdleTime: 1000, queueTimeout: 2000 } }
        );
        console.log("NoSql Pool Initialized");
        return true
    } catch (err) {
        // TODO: better error handling
        console.log("NoSql caught: " + err);
        return false
    }
}

export async function getSession() {
    if (!_client) {
        await dbInit()
    }
    try {
        return await _client.getSession();
    } catch (err) {
        console.log("getSession caught: " + err);
    }
}