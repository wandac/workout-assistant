// Complete representation of a workout, including all objects like workout days, exercises, etc. 

/* curl -X GET https://wger.de/api/v2/workout/224162/canonical_representation/ \
      -H 'Authorization: Token 53a73005874c3695a00755f3dd6470413b5b39fa' */

import BaseService from '../services/BaseService';
import Constants from '../utils/config';

class GetWorkoutByIdService extends BaseService {
      constructor(id) {
            super(Constants.WGER_WORKOUT_ENDPOINT + id + "/canonical_representation/");
      }
}

export default GetWorkoutByIdService;