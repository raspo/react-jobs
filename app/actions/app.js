import {
    REDIRECT_COMPLETE
} from 'constants/action-types';

export function redirect(payload) {
    return {
        type: REDIRECT_COMPLETE,
        payload
    };
}
