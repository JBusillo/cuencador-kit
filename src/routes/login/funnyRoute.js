/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */

export async function get(request, context) {

    console.log("in funny route")
    return {
        body: JSON.stringify({ hello: "hello" })
    }
}

