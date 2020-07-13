import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('NavBar should be present', () => {
    const {getByTestId} = render(
        <App/>
    );

    expect(getByTestId('nav-bar')).toBeInTheDocument();
});
