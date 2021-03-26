const sveltePreprocess = require("svelte-preprocess");
const pkg = require('./package.json');
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
		files: {
			setup: './src/setup'
		},
		adapter: '@sveltejs/adapter-node',
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}

	}
};
