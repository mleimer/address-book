import React from 'react';
import UserOverview from './UserOverview';
import {sampleUser} from '../../../test/mock/user';
import {renderWithProviders} from '../../../test/testUtils';
import {fireEvent} from '@testing-library/react';

const userOverviewDialog = 'user-overview-dialog';
const userName = 'user-name';
const userLogin = 'user-login';
const userEmail = 'user-email';
const userShowDetailsLink = 'user-show-details-link';

describe('<UserOverview/>', () => {

    test('should show user name', () => {
        const {getByTestId} = renderWithProviders(
            <UserOverview
                user={sampleUser}
                open
                onClose={() => {
                }}
            />
        );


        const name = getByTestId(userName);

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent('Charlie Blanc');
    });

    test('should show user login', () => {
        const {getByTestId} = renderWithProviders(
            <UserOverview
                user={sampleUser}
                open
                onClose={() => {
                }}
            />
        );


        const login = getByTestId(userLogin);

        expect(login).toBeInTheDocument();
        expect(login).toHaveTextContent('greenmeercat556');
    });

    test('should show user email', () => {
        const {getByTestId} = renderWithProviders(
            <UserOverview
                user={sampleUser}
                open
                onClose={() => {
                }}
            />
        );


        const email = getByTestId(userEmail);

        expect(email).toBeInTheDocument();
        expect(email).toHaveTextContent('charlie.blanc@example.com');
    });

    test('should renderWithProviders dialog when show details link is clicked', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(
            <UserOverview
                user={sampleUser}
                open onClose={() => {
            }}
            />
        );

        const showDetailsLink = getByTestId(userShowDetailsLink);
        expect(showDetailsLink).toBeInTheDocument();
        let dialog = queryByTestId(userOverviewDialog);
        expect(dialog).not.toBeInTheDocument();

        fireEvent.click(showDetailsLink);

        dialog = getByTestId(userOverviewDialog);
        expect(dialog).toBeInTheDocument();

    });
});
