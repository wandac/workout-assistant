import BaseService from './BaseService';

import Constants from '../utils/config';

class GetWorkoutService extends BaseService {  
    constructor() {
        super(Constants.WGER_WORKOUT_ENDPOINT);
    }
} 

export default GetWorkoutService;