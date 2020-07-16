import {SET_SEARCH, setSearch} from './appBarActions';

describe('app bar actions', () => {

    describe('setSearch', () => {
        test('should dispatch SET_SEARCH with search value', () => {
            const searchValue = 'mySearchValue';

            const expectedAction = {
                type: SET_SEARCH,
                value: searchValue
            };

            expect(setSearch(searchValue)).toEqual(expectedAction);
        });
    });

});
