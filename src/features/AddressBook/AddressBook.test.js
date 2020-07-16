import React from 'react';
import {renderWithProviders} from '../../test/testUtils';
import AddressBook from './AddressBook';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import {ToastProvider} from 'react-toast-notifications';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const addressBookId = 'address-book';
const endOfUsersCatalogId = 'end-of-users-catalog';
const userLoadOnHoldId = 'user-load-on-hold';
const fetchingUsersId = 'fetching-users';

describe('<AddressBook />', () => {
    test('it should mount and show address-book', () => {
        const {getByTestId} = renderWithProviders(
            <AddressBook
                isScrolledToBottom={false}
                onRender={() => {
                }}
            />
        );

        const addressBook = getByTestId(addressBookId);

        expect(addressBook).toBeInTheDocument();
    });

    test('it should not show "end-of-users-catalog" when not all data is loaded', () => {
        const mockedStore = mockStore({
            addressBook: {
                allUsersLoaded: false
            },
            appBar: {
                search: ''
            }
        });

        const {queryByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const endOfUserCatalog = queryByTestId(endOfUsersCatalogId);

        expect(endOfUserCatalog).not.toBeInTheDocument();
    });

    test('it should show "end-of-users-catalog" when all data is loaded', () => {
        const mockedStore = mockStore({
            addressBook: {
                allUsersLoaded: true
            },
            appBar: {
                search: ''
            }
        });

        const {getByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const endOfUserCatalog = getByTestId(endOfUsersCatalogId);

        expect(endOfUserCatalog).toBeInTheDocument();
    });


    test('it should show "user catalog loading on hold while search filter is set" when search filter is present', () => {
        const mockedStore = mockStore({
            addressBook: {},
            appBar: {
                search: 'someValue'
            }
        });

        const {getByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const userLoadingOnHold = getByTestId(userLoadOnHoldId);

        expect(userLoadingOnHold).toBeInTheDocument();
    });

    test('it should not show "user catalog loading on hold while search filter is set" when no search filter is present', () => {
        const mockedStore = mockStore({
            addressBook: {},
            appBar: {
                search: ''
            }
        });

        const {queryByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const userLoadingOnHold = queryByTestId(userLoadOnHoldId);

        expect(userLoadingOnHold).not.toBeInTheDocument();
    });

    test('it should show circular progress when data is being fetched', () => {
        const mockedStore = mockStore({
            addressBook: {
                isFetching: true
            },
            appBar: {
                search: ''
            }
        });

        const {getByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const fetchingUsers = getByTestId(fetchingUsersId);

        expect(fetchingUsers).toBeInTheDocument();
    });

    test('it should not show circular progress when no data is being fetched', () => {
        const mockedStore = mockStore({
            addressBook: {
                isFetching: false
            },
            appBar: {
                search: ''
            }
        });

        const {queryByTestId} = render(
            <ToastProvider>
                <Provider store={mockedStore}>
                    <AddressBook
                        isScrolledToBottom
                        onRender={() => {
                        }}
                    />
                </Provider>
            </ToastProvider>
        );

        const fetchingUsers = queryByTestId(fetchingUsersId);

        expect(fetchingUsers).not.toBeInTheDocument();
    });

    test('it should call onRender callback on first render', () => {
        const onRender = jest.fn(() => {
        });

        renderWithProviders(
            <AddressBook
                isScrolledToBottom={false}
                onRender={onRender}
            />
        );

        expect(onRender.mock.calls.length).toBe(1);
    });
});
