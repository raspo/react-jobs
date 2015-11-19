import fetch from 'isomorphic-fetch';
import {
    PAYMENT_PROGRESSING,
    PAYMENT_COMPLETE,
    PAYMENT_FAILURE,
    UNAUTHORIZED
} from 'constants/action-types';
import { checkStatus } from 'utils';

function processing() {
    return {
        type: PAYMENT_PROGRESSING
    };
}

function failed(data) {
    return {
        type: PAYMENT_FAILURE,
        payload: {
            ...data
        }
    };
}

function unauthorized() {
    return {
        type: UNAUTHORIZED,
        payload: {
            redirect: '/'
        }
    };
}

function complete(data) {
    return {
        type: PAYMENT_COMPLETE,
        payload: {
            ...data
        }
    };
}

export function processPayment(data) {
    return (dispatch) => {
        dispatch(processing());
        return fetch(`/api/jobs/${data.id}/payment`, {
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
                dispatch(failed(json.payment));
            }
            dispatch(complete(json.payment));
        })
        .catch((error) => {
            if (error.res.status >= 400) {
                dispatch(unauthorized());
            }
        });
    };
}
