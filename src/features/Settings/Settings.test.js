import React from 'react';
import {mockedStore, renderWithProviders} from '../../test/testUtils';
import Settings from './Settings';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

describe('<Settings/>', () => {
    test('it should mount', () => {
        const {getByTestId} = renderWithProviders(
            <Settings/>
        );

        const settings = getByTestId('settings');

        expect(settings).toBeInTheDocument();
    });

    test('all nationalities should be pre-selected', () => {
        const {getByTestId} = renderWithProviders(
            <Settings/>
        );

        const nationalitiesSelect = getByTestId('nationalities-select');

        expect(nationalitiesSelect).toBeInTheDocument();
        expect(nationalitiesSelect).toHaveTextContent('CH, ES, FR, GB');
    });

    test('it should remain stable (snapshot test)', () => {
        const component = renderer.create(
            <Provider store={mockedStore}>
                <Settings/>
            </Provider>
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

});
