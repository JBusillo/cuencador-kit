import { dev } from '$app/env';
import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import { OAuth2Client } from 'google-auth-library'


export let facebookConfig = null
export let googleConfig = null

export async function initLoginConfig() {
    if (!googleConfig || !facebookConfig) {

        let env = dev ? "dev" : "prod"

        let jsn = readFileSync(`/var/secrets/facebook.config.${env}.json`);
        facebookConfig = JSON.parse(jsn);

        jsn = readFileSync(`/var/secrets/google.config.${env}.json`);
        googleConfig = JSON.parse(jsn).web

        let url = `https://graph.facebook.com/oauth/access_token?client_id=${facebookConfig.FacebookClientId}&client_secret=${facebookConfig.FacebookSecret}&grant_type=client_credentials`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        let data = await response.json()

        facebookConfig.FacebookAppAccessToken = data.access_token
        googleConfig.googleClient = await new OAuth2Client(googleConfig.GoogleClientId);

        console.log("Login Config Complete")
    }
    return true
};

