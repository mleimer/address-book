import {APPLY_USER_FILTER, LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from './addressBookActions';

function addressBookReducers(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, isFetching: true};
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
        case APPLY_USER_FILTER:
            return {
                ...state,
                visibleUsers: applyFilter(state.loadedUsers, action.filter)
            };
        default:
            return state;
    }
}

function applyFilter(users, filter) {
    return (users || [])
        .filter(applyNationalitiesFilter(filter?.nationalities))
        .filter(applyNameFilter(filter?.name));
}


function applyNationalitiesFilter(nationalities) {
    return (user) => {
        if ((nationalities || []).length > 0) {
            return nationalities.includes(user.nat);
        }
        return true;
    };
}

function applyNameFilter(name) {
    const lowerCaseName = (name || '').toLowerCase();
    return (user) => {
        if (lowerCaseName) {
            return `${user.name.first} ${user.name.last}`.toLowerCase().includes(lowerCaseName);
        }
        return true;
    };
}

export default addressBookReducers;
