import 'cross-fetch/polyfill';
import {BASE_URL} from './baseApi';

/**
 * The fields we are interested in in the payload. (Assumption: this is static for all requests)
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

export function loadUsers(nationalities, page, results) {
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

    return fetch(`${BASE_URL}/?page=${page}&results=${results}&seed=${SEED}&inc=${INC_FIELDS.join(',')}&nat=${nationalities.join(',')}`);
}
