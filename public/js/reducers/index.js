import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { jobs, filter, job } from './jobs.js';

const rootReducer = combineReducers({
    jobs,
    filter,
    job,
    router
});

export default rootReducer;
