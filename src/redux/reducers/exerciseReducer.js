import { 
    FETCHING_EXERCISE_REQUEST,
    FETCHING_EXERCISE_SUCCESS,
    FETCHING_EXERCISE_FAILURE
 } from '../actions/types';

 const initialState = {
     isFetching: true,
     errorMessage: "",
     exercises: []
 };

 const exerciseReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_EXERCISE_REQUEST:
            return { ...state, isFetching: true };
        case FETCHING_EXERCISE_SUCCESS:
            return { ...state, isFetching: false, exercises: action.payload };
        case FETCHING_EXERCISE_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload };
        default:
            return state;
    }
 }

 export default exerciseReducer;