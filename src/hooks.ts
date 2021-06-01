import { dbInit } from '$lib/config/database.config';
import { initLoginConfig } from '$lib/config/login.config';
import { initCryptoConfig } from '$lib/config/crypto.config';
import { dev } from '$app/env';

// src/hooks.js
let initialized = false;
let count = 0

/** @type {import('@sveltejs/kit').Handle} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function handle({request, resolve}) {
	if (!initialized) await initializeModules();

	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
			'X-custom-header': 'potato',
			'Access-Control-Expose-Headers': "X-custom-header"
		}
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types, 
export function getSession( request) {
	count++
	return {
		user: {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			name: 'Joe Busillo',
			title: 'King of Sveltedom',
			count: count
		}
	};
}


async function initializeModules() {
	console.log(`Initializing, environment: ${dev ? 'dev' : 'prod'}`);

	await dbInit();
	await initLoginConfig();
	await initCryptoConfig();
	initialized = true

}
