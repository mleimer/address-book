import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {NATIONALITIES} from '../../common/nationalities';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Settings/>', () => {
    test('it should mount', () => {

        const store = mockStore({
            settings: {
                nationalities: NATIONALITIES.map(n => n.key)
            }
        });

        render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const addressBook = screen.getByTestId('settings');

        expect(addressBook).toBeInTheDocument();
    });
});
