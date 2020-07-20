// curl -X GET https://wger.de/api/v2/exerciseimage/382/thumbnails/ \
//       -H 'Authorization: Token 53a73005874c3695a00755f3dd6470413b5b39fa'

import BaseService from './BaseService';
import Constants from '../utils/config';

class GetExerciseImage extends BaseService {
    constructor(id) {
       super(Constants.WGER_EXERCISE_IMAGE_ENDPOINT.replace('<id>', id)); 
    }
}

export default GetExerciseImage;