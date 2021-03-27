import { dev, browser } from '$app/env';
import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import { OAuth2Client } from 'google-auth-library'


export let loginConfig = null

export async function initLoginConfig() {
    if (!loginConfig) {

        let env = dev ? "dev" : "prod"
        let jsn = readFileSync(`/var/secrets/login.config.${env}.json`)
        loginConfig = JSON.parse(jsn)

        let url = `https://graph.facebook.com/oauth/access_token?client_id=${loginConfig.FacebookClientId}&client_secret=${loginConfig.FacebookSecret}&grant_type=client_credentials`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        let data = await response.json()
        loginConfig.FacebookAppAccessToken = data.access_token
        loginConfig.googleClient = await new OAuth2Client(loginConfig.GoogleClientId);

        console.log("Login Config Complete")
    }
    return true
};

