/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
import { loginConfig } from '$lib/config/login.config'
import fetch from 'node-fetch'
//import { fbfetch } from '$lib/login/fbfetch'

export async function get(request, context) {
    console.log('entering')
    let resp
    let jsonObject

    console.log(request.query.get('token'))

    //
    //   Get App Access Token
    //
    console.log("Get App Access Token")
    let url = `https://graph.facebook.com/oauth/access_token?client_id=1567871489967990&client_secret=${loginConfig.FacebookSecret}&grant_type=client_credentials`

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    try {
        for await (const chunk of response.body) {
            jsonObject = JSON.parse(chunk.toString());
        }
    } catch (err) {
        console.error(err.stack);
    }

    console.log(jsonObject)

    //
    //   Validate App Access Token
    //


    console.log("Validate")

    url = `https://graph.facebook.com/debug_token?input_token=${request.query.get('token')}&access_token=${jsonObject.access_token}`

    response = await fetch(url, {
        method: 'GET'
    })

    resp = await response.json()

    //https://graph.facebook.com/v10.0/10215152904476931?access_token=1567871489967990|XpuranGrw7M_SmbC08EW5YzpNw8

    console.log(resp)
    return {
        body: resp
    }
}
