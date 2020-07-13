import GetWorkoutService from './GetWorkoutService';
import GetWorkoutByIdService from './GetWorkoutByIdService';

export function getWorkoutListService(callback) {
    let getWorkoutServiceCall = new GetWorkoutService();
    getWorkoutServiceCall.fetch(callback);
}

export function getWorkoutByIdService(callback) {
    let getWorkoutByIdServiceCall = new GetWorkoutByIdService();
    getWorkoutByIdServiceCall.fetch(callback);
}
