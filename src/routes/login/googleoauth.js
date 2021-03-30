async function verifyIdTokenAsync(options) {
    if (!options.idToken) {
        throw new Error('The verifyIdToken method requires an ID Token');
    }
    const response = await this.getFederatedSignonCertsAsync();
    const login = await this.verifySignedJwtWithCertsAsync(
        options.idToken,
        response.certs,
        options.audience,
        OAuth2Client.ISSUERS_,
        options.maxExpiry
    );

    return login;
}

async function getFederatedSignonCertsAsync() {
    const nowTime = new Date().getTime();
    const format = hasBrowserCrypto()
        ? CertificateFormat.JWK
        : CertificateFormat.PEM;
    if (
        this.certificateExpiry &&
        nowTime < this.certificateExpiry.getTime() &&
        this.certificateCacheFormat === format
    ) {
        return { certs: this.certificateCache, format };
    }
    let res;
    let url;
    switch (format) {
        case CertificateFormat.PEM:
            url = OAuth2Client.GOOGLE_OAUTH2_FEDERATED_SIGNON_PEM_CERTS_URL_;
            break;
        case CertificateFormat.JWK:
            url = OAuth2Client.GOOGLE_OAUTH2_FEDERATED_SIGNON_JWK_CERTS_URL_;
            break;
        default:
            throw new Error(`Unsupported certificate format ${format}`);
    }
    try {
        res = await this.transporter.request({ url });
    } catch (e) {
        e.message = `Failed to retrieve verification certificates: ${e.message}`;
        throw e;
    }

    const cacheControl = res ? res.headers['cache-control'] : undefined;
    let cacheAge = -1;
    if (cacheControl) {
        const pattern = new RegExp('max-age=([0-9]*)');
        const regexResult = pattern.exec(cacheControl);
        if (regexResult && regexResult.length === 2) {
            // Cache results with max-age (in seconds)
            cacheAge = Number(regexResult[1]) * 1000; // milliseconds
        }
    }

    let certificates = {};
    switch (format) {
        case CertificateFormat.PEM:
            certificates = res.data;
            break;
        case CertificateFormat.JWK:
            for (const key of res.data.keys) {
                certificates[key.kid] = key;
            }
            break;
        default:
            throw new Error(`Unsupported certificate format ${format}`);
    }

    const now = new Date();
    this.certificateExpiry =
        cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
    this.certificateCache = certificates;
    this.certificateCacheFormat = format;
    return { certs: certificates, format, res };
}
