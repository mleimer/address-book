import appBarReducers from './appBarReducers';
import {SET_SEARCH} from './appBarActions';

describe('appBarReducers', () => {
    test('should return the initial state', () => {
        expect(
            appBarReducers(undefined, {})
        ).toEqual(
            {
                search: ''
            }
        );
    });

    describe('SET_SEARCH', () => {
        test('should set search property', () => {
            const searchValue = 'mySearchValue';

            expect(
                appBarReducers({}, {
                    type: SET_SEARCH,
                    value: searchValue
                })
            ).toEqual(
                {
                    search: searchValue
                }
            );
        });
    });
});

