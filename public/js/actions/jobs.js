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

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_JOBS,
        reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

function fetchJobs() {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`http://www.reddit.com/r/${reddit}.json`)
            .then(req => req.json())
            .then(json => dispatch(receivePosts(reddit, json)));
    };
}

function shouldFetchJobs(state) {
    const jobs = state.jobs;
    if (jobs.isFetching) {
        return false;
    }
    return true;
}

export function filterJobs(filter) {
    return {
        type: FILTER_JOBS,
        filter
    };
}

export function requestJobs() {
    return (dispatch, getState) => {
        if (shouldFetchJobs(getState())) {
            return dispatch(fetchJobs());
        }
    };
}
