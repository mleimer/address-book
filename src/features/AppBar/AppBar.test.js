import React from 'react';
import {renderWithProviders} from '../../test/testUtils';
import AppBar from './AppBar';
import {BrowserRouter as Router} from 'react-router-dom';
import {fireEvent} from '@testing-library/react';

const appBarId = 'app-bar';
const searchFieldId = 'search-field';
const addressBookTabId = 'address-book-tab';
const settingsTabId = 'settings-tab';

describe('<AppBar/>', () => {
    test('it should mount within Router component and Address Book and Settings Tab', () => {
        const {getByTestId} = renderWithProviders(
            <Router>
                <AppBar/>
            </Router>
        );

        const appBar = getByTestId(appBarId);
        const addressBookTab = getByTestId(addressBookTabId);
        const settingsTab = getByTestId(settingsTabId);

        expect(appBar).toBeInTheDocument();
        expect(addressBookTab).toBeInTheDocument();
        expect(addressBookTab).toHaveTextContent('Address book');
        expect(settingsTab).toBeInTheDocument();
        expect(settingsTab).toHaveTextContent('Settings');
    });

    test('should show search field on Address book tab, but not on Settings tab', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(
            <Router>
                <AppBar/>
            </Router>
        );

        let searchField = getByTestId(searchFieldId);
        expect(searchField).toBeInTheDocument();

        const settingsTab = getByTestId(settingsTabId);
        fireEvent.click(settingsTab);

        searchField = queryByTestId(searchFieldId);
        expect(searchField).not.toBeInTheDocument();

        const addressBookTab = getByTestId(addressBookTabId);
        fireEvent.click(addressBookTab);

        searchField = getByTestId(searchFieldId);
        expect(searchField).toBeInTheDocument();
    });

});
