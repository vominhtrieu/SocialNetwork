import {AUTHORIZE} from "../constant";

const initialState = {
    isAuthorized: false
}

export function authorizeReducer(state = initialState, action) {
    switch(action.type) {
        case AUTHORIZE:
            return Object.assign({}, state, {
                isAuthorized: action.payload
            });
        default:
            return state;
    }
}