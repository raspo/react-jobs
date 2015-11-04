import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import {
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job
} from './jobs.js';

const rootReducer = combineReducers({
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job,
    router
});

export default rootReducer;
