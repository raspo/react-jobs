import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { jobs, filter } from './jobs.js';

const rootReducer = combineReducers({
    jobs,
    filter,
    router
});

export default rootReducer;
