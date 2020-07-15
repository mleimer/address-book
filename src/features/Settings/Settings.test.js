import React from 'react';
import {render, screen} from '../../test/testUtils';
import Settings from './Settings';

describe('<Settings/>', () => {
    test('it should mount', () => {
        render(
            <Settings/>
        );

        const addressBook = screen.getByTestId('settings');

        expect(addressBook).toBeInTheDocument();
    });
});
