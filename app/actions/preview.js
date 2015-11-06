import {
    SET_PREVIEW,
    UNSET_PREVIEW
} from 'constants/action-types';

export function setPreview(payload) {
    return {
        type: SET_PREVIEW,
        payload: {
            ...payload,
            createdAt: new Date().toString(),
            isFetching: false,
            isPreview: true
        }
    };
}

export function unsetPreview() {
    return {
        type: UNSET_PREVIEW
    };
}
