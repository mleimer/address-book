import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('AppBar should be present', () => {
    const {getByTestId} = render(
        <App/>
    );

    expect(getByTestId('app-bar')).toBeInTheDocument();
});
