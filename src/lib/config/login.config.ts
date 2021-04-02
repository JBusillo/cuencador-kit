import { dev } from '$app/env';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import { OAuth2Client } from 'google-auth-library';

export let facebookConfig = null;
export let googleConfig = null;

export async function initLoginConfig(): Promise<boolean> {
	if (!googleConfig || !facebookConfig) {
		const env = dev ? 'dev' : 'prod';

		let jsn = readFileSync(`/var/secrets/facebook.config.${env}.json`, 'utf-8');
		facebookConfig = JSON.parse(jsn);

		jsn = readFileSync(`/var/secrets/google.config.${env}.json`, 'utf-8');
		googleConfig = JSON.parse(jsn).web;

		const url = `https://graph.facebook.com/oauth/access_token?client_id=${facebookConfig.FacebookClientId}&client_secret=${facebookConfig.FacebookSecret}&grant_type=client_credentials`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		facebookConfig.FacebookAppAccessToken = data.access_token;
		googleConfig.googleClient = await new OAuth2Client(googleConfig.GoogleClientId);

		console.log('Login Config Complete');
	}
	return true;
}
