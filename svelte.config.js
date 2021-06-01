import sveltePreprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
// import { optimizeDeps } from 'vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: 'postcss'
			},
			postcss: true
		})
	],
	kit: {
		adapter: node(),
		target: '#svelte',
		// prerender: {
		// 	enabled: false
		// },
		ssr: false,
		vite: {
			server: {
				//				host: '192.168.2.50'
				force: true
			},
			optimizeDeps: {
				exclude: ['clipboard-copy', 'carbon-components-svelte']
			},
			ssr: {
				external: ['carbon-components-svelte', 'clipboard-copy']
			}
		}
	}
};
export default config;
