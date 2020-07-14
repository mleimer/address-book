import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    LOAD_USERS,
    LOAD_USERS_FAILURE,
    LOAD_USERS_SUCCESS,
    loadInitialUsers,
    loadNextUsers, SHOW_USERS
} from './addressBookActions';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('address book actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('loadInitialUsers', () => {

        it('should dispatch LOAD_USERS upon loading first users', () => {
            const expectedActions = [
                {type: LOAD_USERS}
            ];

            const store = mockStore({addressBook: {}});

            return store.dispatch(loadInitialUsers()).then(() => {
                expect(store.getActions()[0]).toEqual(expectedActions[0]);
            });
        });

        it('should load first users and dispatch LOAD_USERS_SUCCESS upon success', () => {
            const expectedUsers = [{id: 1}, {id: 2}];

            fetchMock.mock('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
                body: {results: expectedUsers},
                headers: {'content-type': 'application/json'}
            });

            const expectedActions = [
                null, // ignored
                {type: LOAD_USERS_SUCCESS, users: expectedUsers}
            ];

            const store = mockStore({addressBook: {}});

            return store.dispatch(loadInitialUsers()).then(() => {
                expect(store.getActions()[1]).toEqual(expectedActions[1]);
            });
        });

        it('should load first users and dispatch SHOW_USERS upon success', () => {
            const expectedUsers = [{id: 1}, {id: 2}];

            fetchMock.mock('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
                body: {results: expectedUsers},
                headers: {'content-type': 'application/json'}
            });

            const expectedActions = [
                null, // ignored
                null, // ignored
                {type: SHOW_USERS}
            ];

            const store = mockStore({addressBook: {}});

            return store.dispatch(loadInitialUsers()).then(() => {
                expect(store.getActions()[2]).toEqual(expectedActions[2]);
            });
        });

        it('should premature dispatch LOAD_USERS after initial bunch', () => {
            const expectedActions = [
                null, // ignored
                null, // ignored
                null, // ignored
                {type: LOAD_USERS}
            ];
            const expectedUsers = [{id: 1}, {id: 2}];

            fetchMock.mock('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
                body: {results: expectedUsers},
                headers: {'content-type': 'application/json'}
            });

            const store = mockStore({addressBook: {}});

            return store.dispatch(loadInitialUsers()).then(() => {
                expect(store.getActions()[3]).toEqual(expectedActions[3]);
            });
        });

        it('should dispatch LOAD_USERS_SUCCESS after premature user load', () => {
            const expectedUsers = [{id: 1}, {id: 2}];

            const expectedActions = [
                null, // ignored
                null, // ignored
                null, // ignored
                null, // ignored
                {type: LOAD_USERS_SUCCESS, users: expectedUsers}
            ];

            fetchMock.mock('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
                body: {results: expectedUsers},
                headers: {'content-type': 'application/json'}
            });

            const store = mockStore({addressBook: {}});

            return store.dispatch(loadInitialUsers()).then(() => {
                expect(store.getActions()[4]).toEqual(expectedActions[4]);
            });
        });

    });

    describe('loadNextUsers', () => {

        it('should do nothing when users are already being fetched', () => {
            const expectedActions = [];
            const store = mockStore({addressBook: {isFetching: true}});

            return store.dispatch(loadNextUsers()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should prevent dispatching further actions when all users are loaded already', () => {
            const expectedActions = [];
            const store = mockStore({addressBook: {allUsersLoaded: true}});

            return store.dispatch(loadNextUsers()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch LOAD_USER and LOAD_USERS_SUCCESS when fetching users is successfully executed', () => {
            const expectedUsers = [{id: 1}, {id: 2}];

            fetchMock.getOnce('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
                body: {results: expectedUsers},
                headers: {'content-type': 'application/json'}
            });

            const expectedActions = [
                {type: LOAD_USERS},
                {type: LOAD_USERS_SUCCESS, users: expectedUsers}
            ];
            const store = mockStore({addressBook: {users: [], isFetching: false}});

            return store.dispatch(loadNextUsers()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch LOAD_USERS_FAILURE when fetching is failing', () => {
            fetchMock.getOnce('https://randomuser.me/api/?page=1&results=50&seed=addressbook', () => {
                throw new Error('network error');
            });

            const expectedActions = [
                {type: LOAD_USERS},
                {type: LOAD_USERS_FAILURE}
            ];
            const store = mockStore({addressBook: {users: []}});

            return store.dispatch(loadNextUsers()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

    });

});
