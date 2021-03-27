const sveltePreprocess = require("svelte-preprocess");
const pkg = require('./package.json');
const node = require('@sveltejs/adapter-node');
/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: "postcss",
			},
			postcss: true
		}),
	],
	kit: {
		adapter: node(),
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}

	}
};
