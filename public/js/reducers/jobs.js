import {
    REQUEST_JOBS,
    RECEIVE_JOBS,
    FILTER_JOBS
} from '../constants/action-types';

export function filter(state = 'all', action) {
    switch (action.type) {
        case FILTER_JOBS:
            return action.filter;
        default:
            return state;
    }
}

export function jobs(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_JOBS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_JOBS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}
