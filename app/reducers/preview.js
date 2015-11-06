import {
    SET_PREVIEW,
    UNSET_PREVIEW
} from 'constants/action-types';

export function preview(state = null, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PREVIEW:
            return { ...payload };
        case UNSET_PREVIEW:
            return null;
        default:
            return state;
    }
}
