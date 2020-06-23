import Constants from '../utils/config';

class BaseService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    fetch() {
        return fetch(Constants.WGER_API_PATH + this.endpoint, {
            method: 'GET',
            headers: {"Authorization": "Token " + Constants.WGER_API_KEY}
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert(JSON.stringify(responseJson));
            console.log(responseJson);
        })
        .catch((error) => {
            alert(JSON.stringify(console.error));
            console.error(error);
        });
        
    }
}

export default BaseService;