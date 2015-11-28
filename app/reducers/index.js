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

import {
    payment
} from 'reducers/payment.js';

const rootReducer = combineReducers({
    app,
    filter,
    isFetchingJobs,
    lastUpdatedJobs,
    jobs,
    jobsById,
    job,
    payment,
    router
});

export default rootReducer;
