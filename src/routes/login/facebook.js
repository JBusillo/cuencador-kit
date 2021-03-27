/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { loginConfig } from '$lib/config/login.config'
import fetch from 'node-fetch'
import { getSession } from '$lib/config/database.config'

export async function get(request, context) {

    //    let loginConfig = await getLoginConfig()
    let user_access_token = request.query.get('token')

    let url = `https://graph.facebook.com/debug_token?input_token=${user_access_token}&access_token=${loginConfig.FacebookAppAccessToken}`
    let response = await fetch(url, {
        method: 'GET'
    })

    let data = await response.json()

    let user_id = data.data.user_id

    url = `https://graph.facebook.com/${user_id}?fields=id,name,email&access_token=${user_access_token}`
    response = await fetch(url, {
        method: 'GET'
    })
    data = await response.json()

    let sess = await getSession()
    await sess.getSchema('Cuencador')
        .getTable('Users')
        .insert(['social_key', 'name', 'email'])
        .values(`F${data.id}`, data.name, data.email)
        .execute();

    sess.close()

    return {
        body: data
    }
}
