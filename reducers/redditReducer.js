import { FETCH_GAMETHREAD_START, FETCH_GAMETHREAD_SUCCESS, FETCH_GAMETHREAD_ERROR } from '../actions/actionTypes';

const initialState = {
    comments: [],
    isLoading: false,
    error: false
}

const redditReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_GAMETHREAD_START: {
            return {
                ...state, isLoading: true
            }
        }
        case FETCH_GAMETHREAD_SUCCESS: {
            return {
                ...state, isLoading: false, comments: action.payload
            }
        }
        case FETCH_GAMETHREAD_ERROR: {
            return {
                ...state, error: action.payload
            }
        }

        default: return state;
    }
}

export default redditReducer;