import axios from 'axios';
import { camelizeKeys } from 'humps';

const API_ROOT = `https://rickandmortyapi.com`;

// create http api with axios to consume resources
export const httpApi = axios.create({
    baseURL: API_ROOT,
    xsrfHeaderName: 'X-CSRF-TOKEN',
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 *
 * @param endpoint String
 * @param data Object
 * @param meta Object
 * @return Promise
 */
const callApi = ({ endpoint:fullUrl, data, meta }) => {
    let setConfig = {
        method: (meta && meta.method) || 'get'
    };
    if(/^(PUT|POST|PATCH)$/i.test(meta && meta.method)) {
        setConfig['data'] = data;
    }else {
        setConfig['params'] = data;
    }
    httpApi.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";

    return httpApi(fullUrl, setConfig)
        .then(({ data:json }) => {
            const camelizedJson = camelizeKeys(json);

            return camelizedJson;
        });
};

/**
 * creator to fetch data to consume the api
 * @param types { Array }
 * @param endpoint { Function|String }
 * @param cancelFetch { Any } variable to assign a request cancel function
 * @return bound action creator
 */
export function fetchCreator(endpointAlt) {
    return (dataReq = {}, params = {}) => {
        const { csrftoken, ...restData } = dataReq;

        const CALL_API = {
            endpoint: typeof endpointAlt === 'function' ? endpointAlt(params) : endpointAlt,
            data: restData
        };
        let { endpoint, data } = CALL_API;

	    return callApi({ endpoint, data }).then(
	        response => ({
	            type: successType,
	            data: response
	        }),
	        error => {
	            if(axios.isCancel(error)) {
	                console.log('Request canceled: ', error.message);
	                return error;
	            }else {
	                // handle error
	                throw error;
	            }
	        }
	    )
    }
}