import endpoints from 'transport/endpoints';
import { httpMethod } from './httpConstants';

/** The api calls details */
export default {
    [endpoints.GET_SHOW_DETAILS]: {
        url: '/api/shows/{0}',
        settings: {
            method: httpMethod.GET,
            headers: new Headers({
                'content-type': 'application/json'
            })
        }
    },
    [endpoints.GET_SHOW_EPISODES]: {
        url: '/api/shows/{0}/episodes',
        settings: {
            method: httpMethod.GET,
            headers: new Headers({
                'content-type': 'application/json'
            })
        }
    },
    [endpoints.GET_SHOW_EPISODE]: {
        url: '/api/shows/{0}/episodebynumber?season={1}&number={2}',
        settings: {
            method: httpMethod.GET,
            headers: new Headers({
                'content-type': 'application/json'
            })
        }
    }
};
