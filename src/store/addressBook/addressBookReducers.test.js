import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from './addressBookActions';
import addressBookReducers from './addressBookReducers';

describe('addressBookReducers', () => {
    it('should return the initial state', () => {
        expect(addressBookReducers(undefined, {})).toEqual(
            {}
        );
    });

    it('should set isFetching to true when LOAD_USERS', () => {
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

    it('should set users and set isFetching to false when LOAD_USERS_SUCCESS', () => {
        expect(
            addressBookReducers({}, {
                type: LOAD_USERS_SUCCESS,
                users: [{id: 1}, {id: 2}]
            })
        ).toEqual(
            {
                isFetching: false,
                isError: false,
                allLoadedUsers: [{id: 1}, {id: 2}]
            }
        );
    });

    it('should add additional users and when LOAD_USERS_SUCCESS repeats', () => {
        expect(
            addressBookReducers({allLoadedUsers: [{id: 1}, {id: 2}]}, {
                type: LOAD_USERS_SUCCESS,
                users: [{id: 3}, {id: 4}]
            })
        ).toEqual(
            {
                isFetching: false,
                isError: false,
                allLoadedUsers: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }
        );
    });

    it('should set isError to true and isFetching to false when LOAD_USERS_FAILURE', () => {
        expect(
            addressBookReducers({isFetching: true}, {
                type: LOAD_USERS_FAILURE
            })
        ).toEqual(
            {isFetching: false, isError: true}
        );
    });
});
