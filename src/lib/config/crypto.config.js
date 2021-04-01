import { dev } from '$app/env';
import { readFileSync } from 'fs'
import crypto from 'crypto'

let cryptoConfig = null
let key, iv


export function initCryptoConfig() {
    if (!cryptoConfig) {

        let env = dev ? "dev" : "prod"

        let jsn = readFileSync(`/var/secrets/crypto.config.${env}.json`);
        cryptoConfig = JSON.parse(jsn)

        key = crypto.scryptSync(cryptoConfig.password, cryptoConfig.salt, 24);
        iv = Buffer.alloc(16, 0); // Initialization vector.


        console.log("Crypto Config Complete")
    }
    return true
}


export function encrypt(plainText) {
    const cipher = crypto.createCipheriv(cryptoConfig.algorithm, key, iv);
    let encrypted = cipher.update(`{"guid": "${CreateGuid()}", "unencrypted" : "${plainText}"}`, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(`encrypted: ${encrypted}`);
    return encrypted
}

export function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(cryptoConfig.algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted)
}

function CreateGuid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}


