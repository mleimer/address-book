import 'cross-fetch/polyfill';

export const SET_SEARCH = 'SET_SEARCH';

export function setSearch(value) {
    return {
        type: SET_SEARCH,
        value
    };
}




