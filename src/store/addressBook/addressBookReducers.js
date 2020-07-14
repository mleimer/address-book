import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS, SHOW_USERS} from './addressBookActions';

function addressBookReducers(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, isFetching: true};
        case SHOW_USERS:
            return {...state, visibleUsers: state.loadedUsers};
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isError: false,
                loadedUsers: [...state.loadedUsers || [], ...action.users],
                allUsersLoaded: [...state.loadedUsers || [], ...action.users].length >= 1000
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
