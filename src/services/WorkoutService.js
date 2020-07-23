// Workout List

/* curl -X GET https://wger.de/api/v2/workout/ \
      -H 'Authorization: Token 53a73005874c3695a00755f3dd6470413b5b39fa'*/

import BaseService from './BaseService';
      
class WorkoutService extends BaseService {  
    constructor() {
        super();
    }
} 
      
export default WorkoutService;