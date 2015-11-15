import { pushState } from 'redux-router';
import {
    REDIRECT_COMPLETE
} from 'constants/action-types';

function redirected() {
    return {
        type: REDIRECT_COMPLETE
    };
}

export function redirect(url) {
    return (dispatch) => {
        dispatch(pushState(null, url));
        return dispatch(redirected());
    };
}
