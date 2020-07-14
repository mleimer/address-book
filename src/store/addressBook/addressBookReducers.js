import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from './addressBookActions';

function addressBookReducers(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, isFetching: true};
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isError: false,
                allLoadedUsers: [...state.allLoadedUsers || [], ...action.users]
            };
        case LOAD_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: true
            };
        default:
            return state;
    }
}

export default addressBookReducers;
