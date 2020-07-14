import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS, SHOW_USERS} from './addressBookActions';
import addressBookReducers from './addressBookReducers';
import {APPLY_SEARCH} from '../navBar/navBarActions';

describe('addressBookReducers', () => {
    test('should return the initial state', () => {
        expect(addressBookReducers(undefined, {})).toEqual(
            {}
        );
    });

    describe('LOAD_USERS', () => {
        test('should set isFetching to true', () => {
            expect(
                addressBookReducers({}, {
                    type: LOAD_USERS
                })
            ).toEqual(
                {
                    isFetching: true
                }
            );
        });
    });

    describe('LOAD_USERS_SUCCESS', () => {
        test('should set users, update allUsersLoaded and set isFetching to false if there are currently no loadedUsers', () => {
            const loadedUsers = buildNUsers(2);
            expect(
                addressBookReducers({}, {
                    type: LOAD_USERS_SUCCESS,
                    users: loadedUsers
                })
            ).toEqual(
                {
                    allUsersLoaded: false,
                    isFetching: false,
                    isError: false,
                    loadedUsers: loadedUsers
                }
            );
        });

        test('should add additional users to existing loadedUsers', () => {
            const loadedUsers = buildNUsers(2);
            expect(
                addressBookReducers({loadedUsers}, {
                    type: LOAD_USERS_SUCCESS,
                    users: [{id: 3}, {id: 4}]
                }).loadedUsers
            ).toEqual([...loadedUsers, {id: 3}, {id: 4}]);
        });

        test('should leave loadedUsers as false as long as 1000 entries are not loaded', () => {
            const loadedUsers = buildNUsers(998);

            expect(
                addressBookReducers({loadedUsers: [{id: 999}]}, {
                    type: LOAD_USERS_SUCCESS,
                    users: loadedUsers
                }).allUsersLoaded
            ).toBe(false);
        });

        test('should update loadedUsers to true when 1000 entries are loaded', () => {
            const loadedUsers = buildNUsers(999);

            expect(
                addressBookReducers({loadedUsers: [{id: 1000}]}, {
                    type: LOAD_USERS_SUCCESS,
                    users: loadedUsers
                }).allUsersLoaded
            ).toBe(true);
        });

    });

    describe('LOAD_USERS_SUCCESS', () => {
        test('should set isError to true and isFetching to false', () => {
            expect(
                addressBookReducers({isFetching: true}, {
                    type: LOAD_USERS_FAILURE
                })
            ).toEqual(
                {isFetching: false, isError: true}
            );
        });
    });

    describe('SHOW_USERS', () => {
        test('should show all loaded users', () => {
            const loadedUsers = buildNUsers(500);

            expect(
                addressBookReducers({loadedUsers}, {
                    type: SHOW_USERS
                })
            ).toEqual(
                {visibleUsers: loadedUsers, loadedUsers: loadedUsers}
            );
        });

        test('should reapply case insensitive substring filter on visibleUsers', () => {
            const loadedUsers = buildNUsers(202);

            expect(
                addressBookReducers({loadedUsers, filter: 'rST20'}, {
                    type: SHOW_USERS
                }).visibleUsers
            ).toEqual([
                {id: 20, name: {first: 'first20', last: 'last20'}},
                {id: 200, name: {first: 'first200', last: 'last200'}},
                {id: 201, name: {first: 'first201', last: 'last201'}}
            ]);
        });
    });

    describe('APPLY_SEARCH', () => {
        test('should apply case insensitive substring search on loaded users to compute visible users', () => {
            const loadedUsers = buildNUsers(101);
            const searchValue = 'ASt10';

            expect(
                addressBookReducers({loadedUsers, filter: ''}, {
                    type: APPLY_SEARCH, value: searchValue
                }).visibleUsers
            ).toEqual([
                {id: 10, name: {first: 'first10', last: 'last10'}},
                {id: 100, name: {first: 'first100', last: 'last100'}}
            ]);
        });

        test('should update filter value', () => {
            const searchValue = 'ASt10';

            expect(
                addressBookReducers({filter: 'other'}, {
                    type: APPLY_SEARCH, value: searchValue
                }).filter
            ).toEqual(searchValue);
        });

        test('should show all loaded users when filter is empty', () => {
            const loadedUsers = buildNUsers(101);
            const searchValue = '';

            expect(
                addressBookReducers({loadedUsers, filter: ''}, {
                    type: APPLY_SEARCH, value: searchValue
                })
            ).toEqual(
                {
                    filter: searchValue,
                    visibleUsers: loadedUsers,
                    loadedUsers: loadedUsers
                }
            );
        });
    });

});

function buildNUsers(size) {
    return [...Array(size).keys()].map(index => {
        return {id: index, name: {first: `first${index}`, last: `last${index}`}};
    });
}
