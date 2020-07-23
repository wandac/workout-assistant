import GetWorkoutService from './GetWorkoutService';
import GetWorkoutByIdService from './GetWorkoutByIdService';
import GetExerciseImage from './GetExerciseImage';
import WorkoutService from './WorkoutService';

export function getWorkoutListService(callback) {
    let getWorkoutServiceCall = new GetWorkoutService();
    getWorkoutServiceCall.oldFetch(callback);
}

export function getWorkoutByIdService(id, callback) {
    let getWorkoutByIdServiceCall = new GetWorkoutByIdService(id);
    getWorkoutByIdServiceCall.oldFetch(callback);
}

export function getExerciseImageService(id, callback) {
    let getExerciseImageServiceCall = new getExerciseImage(id);
    getExerciseImageServiceCall.oldFetch(callback);
}

export function workoutService(request, callback) {
    let workoutServiceCall = new WorkoutService();
    workoutServiceCall.fetch(request, callback);
}
