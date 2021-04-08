import { dbInit } from '$lib/config/database.config';
import { initLoginConfig } from '$lib/config/login.config';
import { initCryptoConfig } from '$lib/config/crypto.config';
import { dev } from '$app/env';

// src/hooks.js
let initialized = false;

export async function handle(request, render) {
	if (!initialized) await initializeModules();
	return render(request);
}

async function initializeModules() {
	console.log(`Initializing, environment: ${dev ? 'dev' : 'prod'}`);

	await dbInit();
	await initLoginConfig();
	await initCryptoConfig();
	initialized = true

}
