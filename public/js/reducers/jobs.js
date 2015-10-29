import {
    REQUEST_JOBS,
    RECEIVE_JOBS,
    FILTER_JOBS
} from '../constants/action-types';

export function filter(state = '', action) {
    const { type, payload } = action;
    switch (type) {
        case FILTER_JOBS:
            return payload.filter;
        default:
            return state;
    }
}

export function jobs(state = {
    isFetching: false,
    items: []
}, action) {
    const { type, payload } = action;

    switch (type) {
        case REQUEST_JOBS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_JOBS:
            return {
                ...state,
                isFetching: false,
                items: payload.items,
                lastUpdated: payload.lastUpdated
            };
        default:
            return state;
    }
}
