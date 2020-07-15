import 'cross-fetch/polyfill';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const APPLY_USER_FILTER = 'APPLY_USER_FILTER';

/**
 * Defining API version to use against randomuser.me
 * @type {string}
 */
const API_VERSION = '1.3';

/**
 * Base URL to the random user server
 * @type {string}
 */
const BASE_URL = `https://randomuser.me/api/${API_VERSION}`;

/**
 * The fields we are interested in in the payload. (Assumption: this is static)
 * @type {string[]}
 */
const INC_FIELDS = ['name', 'login', 'location', 'email', 'phone', 'cell', 'picture', 'nat'];

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

    /*
     * === IMPORTANT NOTE about fetching users from REST-API endpoint ===
     *
     * Behaviour: Provided a seed is given, adjusting the nationality query param is actually not providing a completely different user
     * Although name, location, id (optional), email, phone, cell are dynamic, gender, login, dob, registered and picture stays the same.
     * This should not happen in the real world and hence considering that login.uuid is the only unique identifier of each user,
     * the assumption had been made that even if nationality changes, no recalculation of the to be loaded page has to be made.     *
     *
     *
     * For further details: https://randomuser.me/documentation
     *
     * PathParams:
     * - version        API-Version
     *
     * QueryParams:
     * - page:          Page to load (index is 1 based)
     * - results:       Number of results to load per page
     * - seed:          Kind of a sort key, assuring that the same results are returned for same query params
     * - nat:           Filtering users having one of the provided nationalities
     * - inc:           Fields to be included in the response:
     *                  gender, name, location, email, login, registered, dob, phone, cell, id, picture, nat
     */

    return fetch(`${BASE_URL}/?page=${pageToBeLoaded}&results=${NUMBER_OF_USERS_PER_REQUEST}&seed=${SEED}&inc=${INC_FIELDS.join(',')}&nat=${nationalities.join(',')}`)
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


