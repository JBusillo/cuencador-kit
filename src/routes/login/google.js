/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { getLoginConfig } from '$lib/config/login.config'
import { OAuth2Client } from 'google-auth-library'
import { getSession } from '$lib/config/database.config'
//import open from 'open'

let client = null;
let loginConfig;

export async function get(request, context) {
    //    await open('https://www.amazon.com')
    loginConfig = await getLoginConfig()
    if (!client) {
        client = new OAuth2Client(loginConfig.GoogleClientId);
        await sleep(2000)
    }

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: request.query.get("id_token"),
            audience: loginConfig.GoogleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        return ticket.getPayload();
    }
    let res = await verify().catch(console.error);

    let sess = await getSession()
    sess.getSchema('Cuencador')
        .getTable('Users')
        .insert(['social_key', 'name', 'email'])
        .values(`G${res.sub}`, res.name, res.email)
        .execute();

    sess.close()


    return {
        body: JSON.stringify({ email: res['email'], email_verified: res['email_verified'], name: res['name'] }),
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}