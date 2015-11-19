import fetch from 'isomorphic-fetch';
import {
    REQUEST_JOB,
    RECEIVE_JOB,
    CREATING_NEW_JOB,
    EDITING_JOB,
    UPDATED_JOB,
    PREPARE_NEW_JOB,
    RECEIVE_NEW_JOB,
    JOB_NOT_FOUND
} from 'constants/action-types';
import { checkStatus } from 'utils';

function requestJob(id) {
    return {
        type: REQUEST_JOB,
        payload: {
            id
        }
    };
}

function creatingNewJob() {
    return {
        type: CREATING_NEW_JOB
    };
}

function editingJob() {
    return {
        type: EDITING_JOB
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

export function prepareNewJob() {
    return {
        type: PREPARE_NEW_JOB
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

function updatedJob(data) {
    return {
        type: UPDATED_JOB,
        payload: {
            redirect: `/jobs/${data.slug}/preview`
        }
    };
}

function fetchJob(id) {
    return dispatch => {
        dispatch(requestJob(id));
        return fetch(`/api/jobs/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
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

export function createNewJob(data) {
    return (dispatch) => {
        dispatch(creatingNewJob());
        return fetch('/api/jobs/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(checkStatus)
        .then(req => req.json())
        .then((json) => {
            if (!json.job.errors) {
                dispatch(updatedJob(json.job));
            }
            dispatch(receiveNewJob(json.job));
        });
    };
}

export function updateJob(data) {
    return (dispatch) => {
        dispatch(editingJob());
        return fetch(`/api/jobs/${data.id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(checkStatus)
        .then(req => req.json())
        .then((json) => {
            if (!json.job.errors) {
                dispatch(updatedJob(json.job));
            }
            dispatch(receiveJob(json.job));
        })
        .catch((error) => {
            if (error.res.status >= 400) {
                dispatch(notFound());
            }
        });
    };
}
