import fetch from 'isomorphic-fetch';
import {
    REQUEST_JOB,
    RECEIVE_JOB,
    NEW_JOB,
    RECEIVE_NEW_JOB,
    JOB_NOT_FOUND
} from 'constants/action-types';

function requestJob(id) {
    return {
        type: REQUEST_JOB,
        payload: {
            id
        }
    };
}

function newJob(data) {
    return {
        type: NEW_JOB,
        payload: data
    };
}

function notFound() {
    return {
        type: JOB_NOT_FOUND,
        payload: {
            redirect: '/'
        }
    };
}

function receiveNewJob(json) {
    return {
        type: RECEIVE_NEW_JOB,
        payload: {
            ...json.job,
            isComplete: true
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
            .then(res => {
                if (res.status >= 400) {
                    dispatch(notFound());
                }
                return res.json();
            })
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

export function createJob(data) {
    return (dispatch) => {
        dispatch(newJob(data));
        return fetch('/api/jobs/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(req => req.json())
        .then(json => dispatch(receiveNewJob(json)));
    };
}
