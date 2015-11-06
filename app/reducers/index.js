import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import {
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job
} from 'reducers/jobs.js';

import {
    preview
} from 'reducers/preview.js';

const rootReducer = combineReducers({
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job,
    preview,
    router
});

export default rootReducer;
