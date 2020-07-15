import React from 'react';
import {render, screen} from '../../test/testUtils';
import AppBar from './AppBar';
import {BrowserRouter as Router} from 'react-router-dom';
import {fireEvent} from '@testing-library/react';

const navBarId = 'nav-bar';
const searchFieldId = 'search-field';
const addressBookTabId = 'address-book-tab';
const settingsTabId = 'settings-tab';

describe('<AppBar/>', () => {
    test('it should mount within Router component and Address Book and Settings Tab', () => {
        render(
            <Router>
                <AppBar/>
            </Router>
        );

        const navBar = screen.getByTestId(navBarId);
        const addressBookTab = screen.getByTestId(addressBookTabId);
        const settingsTab = screen.getByTestId(settingsTabId);

        expect(navBar).toBeInTheDocument();
        expect(addressBookTab).toBeInTheDocument();
        expect(addressBookTab).toHaveTextContent('Address book');
        expect(settingsTab).toBeInTheDocument();
        expect(settingsTab).toHaveTextContent('Settings');
    });

    test('should show search field on Address book tab, but not on Settings tab', () => {
        const {getByTestId, queryByTestId} = render(
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
