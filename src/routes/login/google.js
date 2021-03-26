/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { loginConfig } from '$lib/config/login.config'
import fetch from 'node-fetch'
import { OAuth2Client } from 'google-auth-library'
//import { fbfetch } from '$lib/login/fbfetch'

export async function get(request, context) {
    console.log("In Login Google")
    const client = new OAuth2Client(loginConfig.GoogleClientId);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: request.query.get("id_token"),
            audience: loginConfig.GoogleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return payload
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    let res = await verify().catch(console.error);
    console.log(res)

    return {
        body: JSON.stringify(res)
    }
}
