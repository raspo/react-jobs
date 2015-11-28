import fetch from 'isomorphic-fetch';
import {
    REQUEST_JOBS,
    RECEIVE_JOBS,
    FILTER_JOBS
} from 'constants/action-types';

function requestJobs() {
    return {
        type: REQUEST_JOBS
    };
}

function receiveJobs(json) {
    return {
        type: RECEIVE_JOBS,
        payload: {
            entities: json.jobs || [],
            lastUpdated: Date.now()
        }
    };
}

function fetchJobs() {
    return dispatch => {
        dispatch(requestJobs());
        return fetch('/api/jobs', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(req => req.json())
        .then(json => dispatch(receiveJobs(json)));
    };
}

function shouldFetchJobs(state) {
    const { isFetchingJobs, lastUpdatedJobs } = state;
    if (isFetchingJobs) { return false; }
    if (Date.now() - lastUpdatedJobs < 10 * 60 * 1000) { return false; }
    return true;
}

export function setFilter(filter) {
    return {
        type: FILTER_JOBS,
        payload: {
            filter
        }
    };
}

export function getJobs() {
    return (dispatch, getState) => {
        if (shouldFetchJobs(getState())) {
            return dispatch(fetchJobs());
        }
    };
}
