import { dev, browser } from '$app/env';
import { readFileSync } from 'fs'
import fetch from 'node-fetch'

export let loginConfig

if (!browser) {
    facebookAppAccessToken()
}


async function facebookAppAccessToken() {
    console.log("LOGIN CONFIG")
    let env = dev ? "dev" : "prod"
    let json = readFileSync(`/var/secrets/login.config.${env}.json`)
    loginConfig = JSON.parse(json)

    let url = `https://graph.facebook.com/oauth/access_token?client_id=${loginConfig.FacebookClientId}&client_secret=${loginConfig.FacebookSecret}&grant_type=client_credentials`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    data = await response.json()
    loginConfig.FacebookAppAccessToken = data.access_token

};

