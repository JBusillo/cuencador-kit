import { dbInit } from '$lib/config/database.config'
import { initLoginConfig } from '$lib/config/login.config'

if (process.env['hooks_side_effects'] !== 'no')
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
