import {
    REDIRECT_COMPLETE,
    JOB_NOT_FOUND
} from 'constants/action-types';

export function app(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case JOB_NOT_FOUND:
            return payload;
        case REDIRECT_COMPLETE:
            return {};
        default:
            return state;
    }
}
