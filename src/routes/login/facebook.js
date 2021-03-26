/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { loginConfig } from '$lib/config/login.config'
import fetch from 'node-fetch'




export async function get(request, context) {
    console.log('entering')
    console.log(`loginConfig.FacebookAppAccessToken: ${loginConfig.FacebookAppAccessToken}`)
    let resp
    let jsonObject

    console.log(request.query.toString())
    let uat = request.query.get('token')

    //
    //   Get App Access Token
    //
    console.log("Get App Access Token")
    let url = `https://graph.facebook.com/oauth/access_token?client_id=${loginConfig.FacebookClientId}&client_secret=${loginConfig.FacebookSecret}&grant_type=client_credentials`

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    jsonObject = await response.json()

    // try {
    //     for await (const chunk of response.body) {
    //         jsonObject = JSON.parse(chunk.toString());
    //     }
    // } catch (err) {
    //     console.error(err.stack);
    // }

    console.log(jsonObject)

    let access_token = jsonObject.access_token

    //
    //   Validate App Access Token
    //
    url = `https://graph.facebook.com/debug_token?input_token=${request.query.get('token')}&access_token=${access_token}`

    response = await fetch(url, {
        method: 'GET'
    })

    resp = await response.json()

    console.log(resp)

    let user_id = resp.data.user_id

    url = `https://graph.facebook.com/${user_id}?fields=id,name,email&access_token=${uat}`
    //    url = `https://graph.facebook.com/${user_id}?access_token=${uat}`

    response = await fetch(url, {
        method: 'GET'
    })

    resp = await response.json()

    console.log(resp)
    return {
        body: resp
    }
}
