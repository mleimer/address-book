import navBarReducers from './navBarReducers';
import {SET_SEARCH} from './navBarActions';

describe('navBarReducers', () => {
    test('should return the initial state', () => {
        expect(
            navBarReducers(undefined, {})
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
                navBarReducers({}, {
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

