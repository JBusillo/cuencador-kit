import { dbInit } from '$lib/config/database.config'
import { initLoginConfig } from '$lib/config/login.config'


initializeModules()

async function initializeModules() {

    let databaseInitialized = false
    let logonInitialized = false

    if (!databaseInitialized) {
        console.log("In hook, Initializing DB")
        databaseInitialized = await dbInit()
    }

    if (!logonInitialized) {
        console.log("In hook, Initializing Logon")
        logonInitialized = await initLoginConfig()
    }
}
