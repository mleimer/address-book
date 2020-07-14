import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import loadUsers, {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from './addressBookActions';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('address book actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates LOAD_USERS_SUCCESS when fetching users has been done', () => {
        const expectedUsers = [{id: 1}, {id: 2}];

        fetchMock.getOnce('https://randomuser.me/api/?page=1&results=50&seed=addressbook', {
            body: {results: expectedUsers},
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [
            {type: LOAD_USERS},
            {type: LOAD_USERS_SUCCESS, users: expectedUsers}
        ];
        const store = mockStore({addressBook: {users: []}});

        return store.dispatch(loadUsers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates LOAD_USERS_FAILURE when fetching has failed', () => {
        fetchMock.getOnce('https://randomuser.me/api/?page=1&results=50&seed=addressbook', () => {
            throw new Error('network error');
        });

        const expectedActions = [
            {type: LOAD_USERS},
            {type: LOAD_USERS_FAILURE}
        ];
        const store = mockStore({addressBook: {users: []}});

        return store.dispatch(loadUsers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
