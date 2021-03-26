import { dev, browser } from '$app/env';
import { readFileSync } from 'fs'

export let loginConfig

if (!browser) {
    let env = dev ? "dev" : "prod"
    let json = readFileSync(`/var/secrets/login.config.${env}.json`)
    console.log(`This is my json ${json}`)
    loginConfig = JSON.parse(json)
    console.log(loginConfig.FacebookSecret)
    console.log(loginConfig.GoogleSecret)
}
// if (dev) {
//     loginConfig = {
//         FacebookSecret: '3056b57df1427ec398e3b9411b23c94f',
//         GoogleSecret: 'LkMYZvjvnSbZLFvwlbSr1qNq',
//     };
// } else {
//     loginConfig = {
//         FacebookSecret: '3056b57df1427ec398e3b9411b23c94f',
//         GoogleSecret: 'LkMYZvjvnSbZLFvwlbSr1qNq',
//     };

// }
