// import * as cookie from 'cookie';
// import { v4 as uuid } from '@lukeed/uuid';

// export async function prepare(incoming) {
//     const cookies = cookie.parse(incoming.headers.cookie || '');

//     const headers = {};
//     if (!cookies.session_id) {
//         headers['set-cookie'] = `session_id=${uuid()}; HttpOnly`;
//     }

//     return {
//         headers
//     };
// }