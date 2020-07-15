import React from 'react';
import {renderWithProviders} from '../../test/testUtils';
import AddressBook from './AddressBook';

describe('<AddressBook />', () => {
    test('it should mount', () => {
        const {getByTestId} = renderWithProviders(
            <AddressBook
                isScrolledToBottom
                onRender={() => {
                }}
            />
        );

        const addressBook = getByTestId('address-book');

        expect(addressBook).toBeInTheDocument();
    });
});
