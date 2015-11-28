import {
    PROCESS_PAYMENT,
    COMPLETE_PAYMENT,
    INVALID_PAYMENT
} from 'constants/action-types';

export function payment(state = { isProcessing: false }, action) {
    const { type, payload } = action;
    switch (type) {
        case PROCESS_PAYMENT:
            return {
                isProcessing: true
            };
        case COMPLETE_PAYMENT:
            return {
                isProcessing: false,
                isComplete: true
            };
        case INVALID_PAYMENT:
            return {
                errors: { ...payload},
                isProcessing: false
            };
        default:
            return state;
    }
}
