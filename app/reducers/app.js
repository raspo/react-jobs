import {
    REDIRECT_COMPLETE,
    JOB_NOT_FOUND,
    UPDATED_JOB
} from 'constants/action-types';

export function app(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case JOB_NOT_FOUND:
        case UPDATED_JOB:
            return payload;
        case REDIRECT_COMPLETE:
            return {};
        default:
            return state;
    }
}
