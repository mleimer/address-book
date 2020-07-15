import React from 'react';
import {render} from '@testing-library/react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {NATIONALITIES} from '../common/nationalities';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {ToastProvider} from 'react-toast-notifications';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const mockedStore = mockStore({
    addressBook: {},
    settings: {
        nationalities: NATIONALITIES.map(n => n.key)
    },
    navBar: {
        search: ''
    }
});

const AllTheProviders = ({children}) => {
    return (
        <ToastProvider>
            <Provider store={mockedStore}>
                {children}
            </Provider>
        </ToastProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';

export {customRender as renderWithProviders};


AllTheProviders.propTypes = {
    children: PropTypes.any.isRequired
};

