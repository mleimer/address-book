import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS, SHOW_USERS} from './addressBookActions';
import {APPLY_SEARCH} from '../navBar/navBarActions';

function addressBookReducers(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, isFetching: true};
        case SHOW_USERS:
            return {
                ...state,
                visibleUsers: applyFilter(state.loadedUsers, state.filter)
            };
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
        case APPLY_SEARCH:
            return {
                ...state,
                visibleUsers: applyFilter(state.loadedUsers, action.value),
                filter: action.value
            };
        default:
            return state;
    }
}

function applyFilter(users, filter) {
    const filterValueLowerCase = (filter || '').toLowerCase();
    return (users || []).filter(user => {
        return `${user.name.first} ${user.name.last}`.toLowerCase().includes(filterValueLowerCase);
    });
}
export default addressBookReducers;
