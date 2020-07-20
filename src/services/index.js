import GetWorkoutService from './GetWorkoutService';
import GetWorkoutByIdService from './GetWorkoutByIdService';
import GetExerciseImage from './GetExerciseImage';

export function getWorkoutListService(callback) {
    let getWorkoutServiceCall = new GetWorkoutService();
    getWorkoutServiceCall.fetch(callback);
}

export function getWorkoutByIdService(id, callback) {
    let getWorkoutByIdServiceCall = new GetWorkoutByIdService(id);
    getWorkoutByIdServiceCall.fetch(callback);
}

export function getExerciseImageService(id, callback) {
    let getExerciseImageServiceCall = new getExerciseImage(id);
    getExerciseImageServiceCall.fetch(callback);
}
