/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { loginConfig } from '$lib/config/login.config'
import fetch from 'node-fetch'
import { getSession } from '$lib/config/database.config'




export async function get(request, context) {
    let user_access_token = request.query.get('token')
    console.log(`user_access_token:${user_access_token}`)
    console.log(`loginConfig.FacebookAppAccessToken:${loginConfig.FacebookAppAccessToken}`)

    url = `https://graph.facebook.com/debug_token?input_token=${user_access_token}&access_token=${loginConfig.FacebookAppAccessToken}`

    let response = await fetch(url, {
        method: 'GET'
    })

    let data1 = await response.json()
    console.log(data1)

    let user_id = data1.data.user_id

    //    console.log(loginConfig)
    //    console.log(`user_id ${user_id}`)
    //    console.log(`user_access_token ${user_access_token}`)

    console.log(`uat ${user_access_token}`)

    url = `https://graph.facebook.com/${user_id}?fields=id,name,email&access_token=${user_access_token}`

    response = await fetch(url, {
        method: 'GET'
    })

    data = await response.json()

    await getSession()

    console.log(data)
    return {
        body: data
    }
}
