import fetchMock from 'fetch-mock';
import {APPLY_SEARCH, applySearch} from './navBarActions';

describe('nav bar actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('applySearch', () => {

        test('should dispatch APPLY_SEARCH with search value', () => {
            const searchValue = 'mySearchValue';
            const expectedAction = {
                type: APPLY_SEARCH,
                value: searchValue
            };
            expect(applySearch(searchValue)).toEqual(expectedAction);
        });

    });

});
