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
            entity: json.job || {}
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
    // const { job } = state;
    // if (job.isFetching) { return false; }
    return true;
}

export function getJob(id) {
    return (dispatch, getState) => {
        if (shouldFetchJob(getState(), id)) {
            return dispatch(fetchJob(id));
        }
    };
}
