import Constants from '../utils/config';

class BaseService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    oldFetch(callback) {
        return fetch(Constants.WGER_API_PATH + this.endpoint, {
            method: 'GET',
            headers: {"Authorization": "Token " + Constants.WGER_API_KEY}
        })
        .then(this.processResponse.bind(this))
        .then((responseJson) => {
            console.log(responseJson);
            callback(Constants.RESPONSE_RECEIVED, responseJson);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            callback(Constants.API_CALL_COMPLETED);
        });
    }

    fetch(request, callback) {
        console.log(request);

        return fetch(request.url, {
            method: request.method,
            headers: {
                // ...request.headers,
                "Authorization": "Token " + Constants.WGER_API_KEY,
                "Content-Type": "application/json"
            },
            body: request.body
        })
        .then(this.processResponse.bind(this))
        .then((responseJson) => {
            console.log(responseJson);
            callback(Constants.RESPONSE_RECEIVED, responseJson);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            callback(Constants.API_CALL_COMPLETED);
        });
    }

    processResponse(response) {
        if(!response.ok) throw new Error("fetching " + Constants.WGER_API_PATH + this.endpoint + " with status: " + response.status);
        else return response.json();
    }
}

export default BaseService;