import React from 'react';
import {render, screen} from '../../test/testUtils';
import NavBar from './NavBar';
import {BrowserRouter as Router} from 'react-router-dom';

describe('<NavBar />', () => {
    test('it should mount within Router component', () => {
        render(
            <Router>
                <NavBar/>
            </Router>
        );

        const navBar = screen.getByTestId('nav-bar');

        expect(navBar).toBeInTheDocument();
    });
});
