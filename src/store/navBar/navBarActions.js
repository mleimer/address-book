import 'cross-fetch/polyfill';

export const APPLY_SEARCH = 'APPLY_SEARCH';

export function applySearch(value) {
    return {
        type: APPLY_SEARCH,
        value
    };
}




