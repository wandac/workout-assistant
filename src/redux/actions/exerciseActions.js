import { Constants } from '../../utils/';

import {
    FETCHING_EXERCISE_REQUEST,
    FETCHING_EXERCISE_SUCCESS,
    FETCHING_EXERCISE_FAILURE
} from './types';

export const fetchingExerciseRequest = () => ({
    type: FETCHING_EXERCISE_REQUEST
});

export const fetchingExerciseSuccess = (json) => ({
    type: FETCHING_EXERCISE_SUCCESS,
    payload: json
});

export const fetchingExerciseFailure = (error) => ({
    type: FETCHING_EXERCISE_FAILURE,
    payload: error
});

export const fetchExercise = () => {
    return async dispatch => {
        dispatch(fetchingExerciseRequest());
        try {
            let response = await fetch(Constants.WGER_API_PATH + Constants.WGER_EXERCISE_ENDPOINT);
            let json = await response.json();
            dispatch(fetchingExerciseSuccess(json));
        } catch(error) {
            dispatch(fetchingExerciseFailure(error));
        }
    }
}

