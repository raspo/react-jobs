import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import {
    app
} from 'reducers/app.js';

import {
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job
} from 'reducers/jobs.js';

const rootReducer = combineReducers({
    app,
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job,
    router
});

export default rootReducer;
