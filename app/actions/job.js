import fetch from 'isomorphic-fetch';
import {
    REQUEST_JOB,
    RECEIVE_JOB,
    NEW_JOB,
    NEW_JOB_FORM,
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

function editJob(data) {
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

function receiveNewJob(data) {
    return {
        type: RECEIVE_NEW_JOB,
        payload: {
            ...data,
            isComplete: true
        }
    };
}

function receiveJob(data) {
    return {
        type: RECEIVE_JOB,
        payload: {
            ...data,
            isComplete: true
        }
    };
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }

    const error = new Error(res.statusText);
    error.res = res;
    throw error;
}


function fetchJob(id) {
    return dispatch => {
        dispatch(requestJob(id));
        return fetch(`/api/jobs/${id}`)
            .then(checkStatus)
            .then(res => res.json())
            .then(json => dispatch(receiveJob(json.job)))
            .catch((error) => {
                if (error.res.status >= 400) {
                    dispatch(notFound());
                }
            });
    };
}

function shouldFetchJob(state, id) {
    const { jobsById } = state;
    if (jobsById[id] && (jobsById[id].isComplete || jobsById[id].isFetching)) { return false; }
    return true;
}

function loadJobData(state, id) {
    const { jobsById } = state;
    if (jobsById[id] && jobsById[id].isComplete) {
        return jobsById[id];
    }
    return null;
}

export function newJobForm() {
    return {
        type: NEW_JOB_FORM
    };
}

export function getJob(id) {
    return (dispatch, getState) => {
        const state = getState();
        if (shouldFetchJob(state, id)) {
            return dispatch(fetchJob(id));
        }

        const jobData = loadJobData(state, id);
        if (jobData) {
            return dispatch(receiveJob(jobData));
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
        .then(json => dispatch(receiveNewJob(json.job)));
    };
}

export function updateJob(data) {
    return (dispatch) => {
        dispatch(editJob(data));
        return fetch(`/api/jobs/${data.id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(req => req.json())
        .then(json => dispatch(receiveJob(json)))
        .catch((error) => {
            if (error.res.status >= 400) {
                dispatch(notFound());
            }
        });
    };
}
