import fetch from 'isomorphic-fetch';
import {
        REQUEST_JOBS,
        RECEIVE_JOBS,
        FILTER_JOBS
} from '../constants/action-types';

function requestPosts() {
    return {
        type: REQUEST_JOBS
    };
}

function receiveJobs(json) {
    return {
        type: RECEIVE_JOBS,
        payload: {
            items: json.jobs || [],
            lastUpdated: Date.now()
        }
    };
}

function fetchJobs() {
    return dispatch => {
        dispatch(requestPosts());
        return fetch('/api/jobs')
            .then(req => req.json())
            .then(json => dispatch(receiveJobs(json)));
    };
}

function shouldFetchJobs(state) {
    const jobs = state.jobs;
    if (jobs.isFetching) { return false; }
    if (Date.now() - jobs.lastUpdated < 10 * 60 * 1000) { return false; }
    return true;
}

export function filterJobs(filter) {
    return {
        type: FILTER_JOBS,
        payload: {
            filter
        }
    };
}

export function requestJobs() {
    return (dispatch, getState) => {
        if (shouldFetchJobs(getState())) {
            return dispatch(fetchJobs());
        }
    };
}
