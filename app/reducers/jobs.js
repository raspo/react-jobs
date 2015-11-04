import _ from 'lodash';
import {
    REQUEST_JOBS,
    RECEIVE_JOBS,
    FILTER_JOBS,
    REQUEST_JOB,
    RECEIVE_JOB
} from 'constants/action-types';

export function filter(state = '', action) {
    const { type, payload } = action;
    switch (type) {
        case FILTER_JOBS:
            return payload.filter;
        default:
            return state;
    }
}

export function isFetchingJobs(state = false, action) {
    const { type } = action;

    switch (type) {
        case REQUEST_JOBS:
            return true;
        case RECEIVE_JOBS:
            return false;
        default:
            return state;
    }
}

export function lastUpdatedJobs(state = 0, action) {
    const { type, payload } = action;

    switch (type) {
        case RECEIVE_JOBS:
            return payload.lastUpdated;
        default:
            return state;
    }
}

export function jobs(state = [], action) {
    const { type, payload } = action;

    switch (type) {
        case RECEIVE_JOBS:
            return _.map(payload.entities, entity => entity.id);
        default:
            return state;
    }
}

export function jobsById(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case RECEIVE_JOB:
            const nextState = { ...state };
            nextState[payload.id] = payload;
            return nextState;
        case RECEIVE_JOBS:
            return _.reduce(payload.entities, (result, entity) => {
                result[entity.id] = { ...entity };
                return result;
            }, {});
        default:
            return state;
    }
}

export function job(state = {
    isComplete: false,
    isFetching: false
}, action) {
    const { type, payload } = action;

    switch (type) {
        case REQUEST_JOB:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_JOB:
            return {
                ...state,
                ...payload,
                isFetching: false
            };
        default:
            return state;
    }
}
