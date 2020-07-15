import React from 'react';
import {render, screen} from '../../testUtils';
import AddressBook from './AddressBook';

describe('<AddressBook />', () => {
    test('it should mount', () => {
        render(
            <AddressBook
                isScrolledToBottom
                onRender={() => {
                }}
            />
        );

        const addressBook = screen.getByTestId('address-book');

        expect(addressBook).toBeInTheDocument();
    });
});
