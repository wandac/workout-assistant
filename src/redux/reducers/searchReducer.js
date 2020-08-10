import SEARCH_RESULT_VISIBILITY from '../actions/types';

const searchReducer = (state = false, action) => {
    switch(action.type) {
        case SEARCH_RESULT_VISIBILITY:
            return action.payload;
        default:
            return state;
    }
}

export default searchReducer