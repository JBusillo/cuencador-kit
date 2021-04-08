import { dbInit } from '$lib/config/database.config';
import { initLoginConfig } from '$lib/config/login.config';
import { initCryptoConfig } from '$lib/config/crypto.config';
import { dev } from '$app/env';

// src/hooks.js
let initialized = false;
let count = 0

export async function handle(request, render) {
	if (!initialized) await initializeModules();

	const response = await render(request);
	return {
		...response,
		headers: {
			...response.headers,
			'X-custom-header': 'potato',
			'Access-Control-Expose-Headers': "X-custom-header"
		}
	};
}

export function getSession({ context }) {
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

export async function getContext({ method, host, headers, query, body }) {
	// console.log(`method : ${method}`)
	// console.log(`host : ${host}`)
	// console.log(`headers : ${JSON.stringify(headers)}`)
	// console.log(`query : ${query}`)
	// console.log(`body : ${body}`)

	return {}
}

async function initializeModules() {
	console.log(`Initializing, environment: ${dev ? 'dev' : 'prod'}`);

	await dbInit();
	await initLoginConfig();
	await initCryptoConfig();
	initialized = true

}
