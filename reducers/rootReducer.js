import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import redditReducer from './redditReducer'

const rootReducer = combineReducers({
    schedule: scheduleReducer,
    reddit: redditReducer
});

export default rootReducer;