import fetch from 'isomorphic-fetch';
import {
        REQUEST_JOB,
        RECEIVE_JOB
} from '../constants/action-types';

function requestJob(id) {
    return {
        type: REQUEST_JOB,
        payload: {
            id
        }
    };
}

function receiveJob(json) {
    return {
        type: RECEIVE_JOB,
        payload: {
            ...json.job,
            isComplete: true
        }
    };
}

function fetchJob(id) {
    return dispatch => {
        dispatch(requestJob(id));
        return fetch(`/api/jobs/${id}`)
            .then(req => req.json())
            .then(json => dispatch(receiveJob(json)));
    };
}

function shouldFetchJob(state, id) {
    const { jobsById } = state;
    if (jobsById[id] && (jobsById[id].isComplete || jobsById[id].isFetching)) { return false; }
    return true;
}

export function getJob(id) {
    return (dispatch, getState) => {
        if (shouldFetchJob(getState(), id)) {
            return dispatch(fetchJob(id));
        }
    };
}
