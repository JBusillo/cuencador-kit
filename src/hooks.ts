import { dbInit } from '$lib/config/database.config';
import { initLoginConfig } from '$lib/config/login.config';
import { initCryptoConfig } from '$lib/config/crypto.config';

if (process.env['hooks_side_effects'] !== 'no') initializeModules();

async function initializeModules() {
	let databaseInitialized = false;
	let logonInitialized = false;
	let cryptoInitialized = false;

	if (!databaseInitialized) {
		console.log('In hook, Initializing DB');
		databaseInitialized = await dbInit();
	}

	if (!logonInitialized) {
		console.log('In hook, Initializing Logon');
		logonInitialized = await initLoginConfig();
	}

	if (!cryptoInitialized) {
		console.log('In hook, Initializing Crypto');
		cryptoInitialized = await initCryptoConfig();
	}
}
