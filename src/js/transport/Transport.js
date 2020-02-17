import transportConfig from 'transport/transport.config';
import endpoints from 'transport/endpoints';
import { httpStatus, httpMethod, httpContentType } from './httpConstants';

/**
 * The class defines a transport level of communication with a middleware
 */
class Transport {

    /**
     * Call a middleware API method
     * @param {String} endpoint - an endpoint name of API call
     * @param {Object} payload - a call payload
     * @param {Object} params - replacement parameters
     */
    callApi(endpoint, payload = null, params = null) {
        const apiData = transportConfig[endpoint];
        if (!apiData) {
            throw new Error(`Unknown API call (${endpoint})`);
        }

        var settings = null;
        const { url, settings: defaultSettings } = apiData;
        if (defaultSettings || payload) {
            settings = {
                ...(defaultSettings || {})
            };
            payload && (settings = {
                ...settings,
                ...{
                    body: {
                        ...settings.body,
                        ...payload
                    }
                }
            });
        }

        const method = (settings && settings.method) || httpMethod.GET;
        if (method == httpMethod.GET || method == httpMethod.HEAD) {
            settings && delete settings.body;
        }

        return new Promise(function(resolve, reject) {
            fetch(params ? this.encodeParams(url, params) : url, settings).
            then(responseData => {
                if ([httpStatus.OK, httpStatus.ACCEPTED].includes(responseData.status)) {
                    responseData.text().then(text => {
                        try {
                            resolve(text && text.length ? JSON.parse(text) : null);
                        } catch (e) {
                            reject(e);
                        }
                    }, reject);
                }
            }, e => reject(e)).
            catch(e => reject(e));
        }.bind(this));
    }

    /**
     * Encode params into URL
     * @param {String} url - an URL to be encoded
     * @param {Object} params - additional params to be encoded into an URL
     * @return {String} - encoded url string
     */
    encodeParams(url, params) {
        var encodedURL = url;
        const currentParams = (params instanceof Array) ? params : [params];

        currentParams.forEach((param, index) => {
            if (param instanceof Object) {
                const [pureUrl, defaultParams] = encodedURL.split('?');
                const combinedParams = defaultParams ? {
                    ...defaultParams.split('&').reduce((output, element) => {
                        const [param, value] = element.split('=');
                        output[param] = value;
                        return output;
                    }, {}),
                    ...param
                } : param;
                encodedURL =
                    `${pureUrl}?${Object.
                        keys(combinedParams).
                        map(param =>`${param}=${encodeURIComponent(combinedParams[param])}`).
                        join('&')}`;
            } else {
                encodedURL = encodedURL.replace(new RegExp(`\\{${index}\\}`), encodeURIComponent(param));
            }
        });

        return encodedURL;
    }
}

export default Transport;
