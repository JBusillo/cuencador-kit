import { dev, browser } from '$app/env';
export let config;

if (browser) {
	if (dev) {
		config = {
			server: `testrest.cuencador.com`,
			facebook: {
				appId: '1567871489967990',
				callback: 'http://localhost:3000/fbcallback.html'
			},
			google: {
				clientId: '310256881973-qcggp7ilaa85810od8slf2t96hskmus9.apps.googleusercontent.com',
				callback: 'http://localhost:3000/ggcallback.html'
			},
			yahoo: {
				appId: 'ZPUNZs56',
				clientId:
					'dj0yJmk9bWdhaVhseVZKM2w5JmQ9WVdrOVdsQlZUbHB6TlRZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWJm',
				callback: 'http://local.cuencador.com/yhcallback.html'
			}
		};
	} else {
		config = {
			server: `cuencador.com`,
			facebook: {
				appId: '1563347010439209',
				callback: 'https://www.cuencador.com/fbcallback.html'
			},
			google: {
				clientId: '784597570096-9um5nde85u0pufo9cumjtbsr8qm439ov.apps.googleusercontent.com',
				callback: 'https://cuencador.com/ggcallback.html'
			},
			yahoo: {
				appId: 'ZPUNZs56',
				clientId:
					'dj0yJmk9bWdhaVhseVZKM2w5JmQ9WVdrOVdsQlZUbHB6TlRZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWJm',
				callback: 'http://local.cuencador.com/yhcallback.html'
			}
		};
		// config = {
		//     server: "rest.cuencador.com",
		//     facebook: {
		//         appId: "1567871489967990",
		//         callback: "https://rest.cuencador.com/fbcallback.html",
		//     },
		//     google: {
		//         clientId:
		//             "784597570096-9um5nde85u0pufo9cumjtbsr8qm439ov.apps.googleusercontent.com",
		//         callback: "https://rest.cuencador.com/gcallback.html",
		//     },
		// };
	}
}
//export let config;
