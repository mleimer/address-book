import React from 'react';
import {sampleUser} from '../../../../test/mock/user';
import UserOverviewDialog from './UserOverviewDialog';
import {render} from '../../../../test/testUtils';
import {fireEvent} from '@testing-library/react';

const userOverviewDialog = 'user-overview-dialog';
const userDialogName = 'user-dialog-name';
const userDialogAddressLine1 = 'user-dialog-address-line-1';
const userDialogAddressLine2 = 'user-dialog-address-line-2';
const userDialogCell = 'user-dialog-cell';
const userDialogPhone = 'user-dialog-phone';
const closeButton = 'close-button';

describe('<UserOverviewDialog/>', () => {

    test('when closed, it should not mount Dialog', () => {
        const {queryByTestId} = render(
            <UserOverviewDialog
                user={sampleUser}
                open={false}
                onClose={() => {
                }}
            />
        );

        const addressBook = queryByTestId(userOverviewDialog);

        expect(addressBook).not.toBeInTheDocument();
    });

    describe('when open', () => {
        test('it should mount Dialog', () => {
            const {getByTestId} = render(
                <UserOverviewDialog
                    user={sampleUser}
                    open
                    onClose={() => {
                    }}
                />
            );

            const dialog = getByTestId(userOverviewDialog);

            expect(dialog).toBeInTheDocument();
        });

        test('should show user name', () => {
            const {getByTestId} = render(
                <UserOverviewDialog
                    user={sampleUser}
                    open
                    onClose={() => {
                    }}
                />
            );

            const name = getByTestId(userDialogName);

            expect(name).toBeInTheDocument();
            expect(name).toHaveTextContent('Charlie Blanc');
        });

        test('should show user address', () => {
            const {getByTestId} = render(
                <UserOverviewDialog
                    user={sampleUser}
                    open
                    onClose={() => {
                    }}
                />
            );

            const addressLine1 = getByTestId(userDialogAddressLine1);
            const addressLine2 = getByTestId(userDialogAddressLine2);

            expect(addressLine1).toBeInTheDocument();
            expect(addressLine2).toBeInTheDocument();
            expect(addressLine1).toHaveTextContent('Rue Gasparin 930');
            expect(addressLine2).toHaveTextContent('50633 Rouen (Loiret)');
        });

        test('should show user cell and phone', () => {
            const {getByTestId} = render(
                <UserOverviewDialog
                    user={sampleUser}
                    open
                    onClose={() => {
                    }}
                />
            );

            const cell = getByTestId(userDialogCell);
            const phone = getByTestId(userDialogPhone);

            expect(cell).toBeInTheDocument();
            expect(phone).toBeInTheDocument();
            expect(cell).toHaveTextContent('06-10-79-30-86');
            expect(phone).toHaveTextContent('02-02-77-85-90');
        });

        test('should call onClose function when dialog gets closed', () => {
            const mockOnClose = jest.fn(() => {
            });

            const {getByTestId} = render(
                <UserOverviewDialog
                    user={sampleUser}
                    open
                    onClose={mockOnClose}
                />
            );

            fireEvent.click(getByTestId(closeButton));

            expect(mockOnClose.mock.calls.length).toBe(1);
        });
    });
});
