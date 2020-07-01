import GetWorkoutService from './GetWorkoutService';

export function getWorkoutService(callback) {
    let getWorkoutServiceCall = new GetWorkoutService();
    getWorkoutServiceCall.fetch(callback);
}
