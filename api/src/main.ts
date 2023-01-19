import AppCenter, { RequestHeadersHandler, RequestHeaders, Logger } from './generated/app-center'

class AppCenterWithAuth extends AppCenter {
    constructor(apiToken ?: string, domain ?: string, logger ?: Logger) {
        super(domain, logger);
        if (apiToken) {
            this.setRequestHeadersHandler(headers => ({'X-API-Token': apiToken, ...headers}))
        }
    }
}

export default AppCenterWithAuth;
