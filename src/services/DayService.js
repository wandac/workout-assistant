// Day List

// // Adds training day
// curl --location --request POST 'https://wger.de/api/v2/day/' \
// --header 'Authorization: Token 53a73005874c3695a00755f3dd6470413b5b39fa' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "description": "arms",
//     "training": 226995,
//     "day": [3]
// }'

import BaseService from './BaseService';
      
class DayService extends BaseService {  
    constructor() {
        super();
    }
} 
    
export default DayService;