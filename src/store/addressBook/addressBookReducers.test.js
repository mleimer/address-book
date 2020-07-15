import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from './addressBookActions';
import addressBookReducers from './addressBookReducers';

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

});

function buildNUsers(size) {
    return [...Array(size).keys()].map(index => {
        return {id: index, name: {first: `first${index}`, last: `last${index}`}};
    });
}
