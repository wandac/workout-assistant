import GetWorkoutService from './GetWorkoutService';

export function getWorkoutService() {
    let getWorkoutServiceCall = new GetWorkoutService();
    getWorkoutServiceCall.fetch();
}
