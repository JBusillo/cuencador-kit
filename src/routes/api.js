/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
	// Return Object

	// return {
	// 	body: {
	// 		test: "test"
	// 	}
	// }

	// Return JSON

	return {
		body: JSON.stringify(`"test": "test2"`)
	}
}
