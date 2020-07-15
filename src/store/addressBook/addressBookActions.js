import {loadUsers} from '../../api/userApi';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const APPLY_USER_FILTER = 'APPLY_USER_FILTER';

/**
 * Number of additional users to fetch in each request
 * @type {number}
 */
const NUMBER_OF_USERS_PER_REQUEST = 50;

function loadUsersAction() {
    return {
        type: LOAD_USERS
    };
}

function loadUsersSuccessAction(response) {
    return {
        type: LOAD_USERS_SUCCESS,
        users: response.results
    };
}

function loadUsersFailureAction() {
    return {
        type: LOAD_USERS_FAILURE
    };
}

function shouldLoadUsers(state) {
    if (state.addressBook?.isFetching) {
        return false;
    } else if (state.navBar?.search) {
        return false;
    } else if (state.addressBook?.allUsersLoaded) {
        return false;
    }
    return true;
}

async function loadUsersIfApplicable(dispatch, state) {
    if (!shouldLoadUsers(state())) {
        return;
    }
    const allLoadedUsersCount = state().addressBook?.loadedUsers?.length || 0;
    const pageToBeLoaded = (allLoadedUsersCount / NUMBER_OF_USERS_PER_REQUEST) + 1;
    const nationalities = state().settings?.nationalities || ['CH', 'ES', 'FR', 'GB'];

    dispatch(loadUsersAction());

    return loadUsers(nationalities, pageToBeLoaded, NUMBER_OF_USERS_PER_REQUEST)
        .then(response => response.json())
        .then(response => dispatch(loadUsersSuccessAction(response)))
        .catch(() => dispatch(loadUsersFailureAction()));
}

export function loadInitialUsers() {
    return async (dispatch, state) => {
        return loadUsersIfApplicable(dispatch, state)
            .then(() => dispatch(applyUserFilter()))
            .then(() => dispatch(loadNextUsers()));
    };
}

export function loadNextUsers() {
    return async (dispatch, state) => {
        return loadUsersIfApplicable(dispatch, state);
    };
}

export function applyUserFilter() {
    return async (dispatch, state) => {
        const filter = {
            nationalities: state().settings?.nationalities,
            name: state().navBar?.search
        };
        return dispatch({
            type: APPLY_USER_FILTER,
            filter: filter
        });
    };
}


