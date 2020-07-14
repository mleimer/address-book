import 'cross-fetch/polyfill';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';

/**
 * Seed is used to get the same result set whenever we call the randomuser REST-API
 * Seeds allow you to always generate the same set of users.
 * Seeds can be any string or sequence of characters.
 * @type {string}
 */
const SEED = 'addressbook';

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

function loadUsers() {
    return (dispatch, state) => {
        let allLoadedUsersCount = state().addressBook?.allLoadedUsers?.length || 0;
        let pageToBeLoaded = (allLoadedUsersCount / NUMBER_OF_USERS_PER_REQUEST) + 1;
        dispatch(loadUsersAction());
        return fetch(`https://randomuser.me/api/?page=${pageToBeLoaded}&results=${NUMBER_OF_USERS_PER_REQUEST}&seed=${SEED}`)
            .then(response => response.json())
            .then(response => dispatch(loadUsersSuccessAction(response)))
            .catch(() => dispatch(loadUsersFailureAction()));
    };
}

export default loadUsers;
