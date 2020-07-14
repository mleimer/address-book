import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS, SHOW_USERS} from './addressBookActions';
import addressBookReducers from './addressBookReducers';

describe('addressBookReducers', () => {
    it('should return the initial state', () => {
        expect(addressBookReducers(undefined, {})).toEqual(
            {}
        );
    });

    describe('LOAD_USERS', () => {
        it('should set isFetching to true', () => {
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
        it('should set users, update allUsersLoaded and set isFetching to false if there are currently no loadedUsers', () => {
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

        it('should add additional users to existing loadedUsers', () => {
            const loadedUsers = buildNUsers(2);
            expect(
                addressBookReducers({loadedUsers}, {
                    type: LOAD_USERS_SUCCESS,
                    users: [{id: 3}, {id: 4}]
                }).loadedUsers
            ).toEqual([...loadedUsers, {id: 3}, {id: 4}]);
        });

        it('should leave loadedUsers as false as long as 1000 entries are not loaded', () => {
            const loadedUsers = buildNUsers(998);

            expect(
                addressBookReducers({loadedUsers: [{id: 999}]}, {
                    type: LOAD_USERS_SUCCESS,
                    users: loadedUsers
                }).allUsersLoaded
            ).toBe(false);
        });

        it('should update loadedUsers to true when 1000 entries are loaded', () => {
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
        it('should set isError to true and isFetching to false', () => {
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
        it('should show all loaded users', () => {
            const loadedUsers = buildNUsers(500);

            expect(
                addressBookReducers({loadedUsers}, {
                    type: SHOW_USERS
                })
            ).toEqual(
                {visibleUsers: loadedUsers, loadedUsers: loadedUsers}
            );
        });
    });

});

function buildNUsers(size) {
    return [...Array(size).keys()].map(index => {
        return {id: index};
    });
}
