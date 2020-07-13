// Workout List

/* curl -X GET https://wger.de/api/v2/workout/ \
      -H 'Authorization: Token 53a73005874c3695a00755f3dd6470413b5b39fa'*/

import BaseService from './BaseService';
import Constants from '../utils/config';

class GetWorkoutService extends BaseService {  
    constructor() {
        super(Constants.WGER_WORKOUT_ENDPOINT);
    }
} 

export default GetWorkoutService;