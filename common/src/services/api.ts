import fetch, {RequestInit} from 'node-fetch';

const BASE_URI = 'https://api.appcenter.ms/v0.1/apps';

export const fetchApi = (path: string, options: RequestInit, apiToken: string) => {
    return fetch(`${BASE_URI}/${path}`, {
        headers: {
            'accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            'X-API-Token': apiToken
        },
        ...options
    })
}
