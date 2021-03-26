import { dev, browser } from '$app/env';
import { readFileSync } from 'fs'
import fetch from 'node-fetch'

export let loginConfig

if (!browser) {
    let env = dev ? "dev" : "prod"
    let json = readFileSync(`/var/secrets/login.config.${env}.json`)
    loginConfig = JSON.parse(json)
    loginConfig.FacebookAppAccessToken = facebookAppAccessToken()
    console.log(`loginConfig.FacebookAppAccessToken: ${loginConfig.FacebookAppAccessToken}`)
    console.log("Done with Global Config")
}


async function facebookAppAccessToken() {
    console.log("Get Global App Access Token")
    let url = `https://graph.facebook.com/oauth/access_token?client_id=${loginConfig.FacebookClientId}&client_secret=${loginConfig.FacebookSecret}&grant_type=client_credentials`
    console.log(url)

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(`response: ${response}`)

    data = await response.json()
    console.log(`data: ${data}`)
    console.log(`token: ${data.access_token}`)
    return data.access_token
};

