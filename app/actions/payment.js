import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import {
    PROCESS_PAYMENT,
    COMPLETE_PAYMENT,
    INVALID_PAYMENT,
    UNAUTHORIZED
} from 'constants/action-types';
import { checkStatus } from 'utils';

function processing() {
    return {
        type: PROCESS_PAYMENT
    };
}

function failed(data) {
    return {
        type: INVALID_PAYMENT,
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
        type: COMPLETE_PAYMENT,
        payload: {
            ...data
        }
    };
}

function processPayment(data) {
    return (dispatch) => {
        return fetch(`/api/jobs/${data.id}/payment`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: JSON.stringify(data)
        })
        .then(checkStatus)
        .then(req => req.json())
        .then((json) => {
            if (!json.job.errors) {
                dispatch(failed(json.job));
            }
            dispatch(complete(json.job));
        })
        .catch((error) => {
            if (error.res.status >= 400) {
                dispatch(unauthorized());
            }
        });
    };
}

function tokenHandler(status, response, postingData) {
    return (dispatch) => {
        if (response.error) {
            const validationError = {};
            validationError[response.error.param] = { ...response.error };

            dispatch(failed(validationError));
        } else {
            dispatch(processPayment({
                ...postingData,
                stripeToken: response.id
            }));
        }
    };
}

export function submitPayment(data) {
    return (dispatch) => {
        const { card, posting } = data;
        dispatch(processing());
        window.Stripe.setPublishableKey('pk_test_W6Vsbolbp9nlLX7on999beph');
        window.Stripe.card.createToken(card, (status, response) => {
            dispatch(tokenHandler(status, response, posting));
        });
    };
}
