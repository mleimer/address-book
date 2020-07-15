import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './NavBar';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<NavBar />', () => {
    test('it should mount within Router component', () => {

        const store = mockStore({
            navBar: {
                search: ''
            }
        });

        render(
            <Provider store={store}>
                <Router>
                    <NavBar/>
                </Router>
            </Provider>
        );

        const navBar = screen.getByTestId('nav-bar');

        expect(navBar).toBeInTheDocument();
    });
});
