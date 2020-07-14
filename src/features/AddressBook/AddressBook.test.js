import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddressBook from './AddressBook';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<AddressBook />', () => {
    test('it should mount', () => {

        const store = mockStore({addressBook: {users: []}});

        render(
            <Provider store={store}>
                <AddressBook/>
            </Provider>
        );

        const addressBook = screen.getByTestId('address-book');

        expect(addressBook).toBeInTheDocument();
    });
});
