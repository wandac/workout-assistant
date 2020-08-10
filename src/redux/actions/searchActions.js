import SEARCH_RESULT_VISIBILITY from './types';

export const setSearchResultVisibility = (visible) => {
    return {
        type: SEARCH_RESULT_VISIBILITY,
        payload: visible,
    };
}