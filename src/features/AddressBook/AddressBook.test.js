import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddressBook from "./AddressBook";

describe('<AddressBook />', () => {
    test('it should mount', () => {
        render(
            <AddressBook/>
        );

        const addressBook = screen.getByTestId('address-book');

        expect(addressBook).toBeInTheDocument();
    });
});
