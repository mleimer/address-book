import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import {applyUserFilter, loadInitialUsers, loadNextUsers} from '../../store/addressBook/addressBookActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import {useToasts} from 'react-toast-notifications';
import UserOverview from './UserOverview';

const useStyles = makeStyles(() => ({
    container: {
        padding: '1rem',
        maxWidth: 'unset'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
    },
    icon: {
        margin: '0 0.5rem'
    },
    centeredContent: {
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
        marginTop: '12px',
        padding: '12px'
    }
}));

function AddressBook({isScrolledToBottom, onRender}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const search = useSelector(state => state.appBar.search);
    const nationalities = useSelector(state => state.settings?.nationalities);
    const loadedUsers = useSelector(state => state.addressBook.loadedUsers);
    const visibleUsers = useSelector(state => state.addressBook.visibleUsers);
    const allUsersLoaded = useSelector(state => state.addressBook.allUsersLoaded);
    const isFetching = useSelector(state => state.addressBook.isFetching);
    const error = useSelector(state => state.addressBook.error);
    const {addToast} = useToasts();

    /*
     * inform the parent about rendering the component, as isScrolledToBottom only gets updated when user scrolls,
     * not when scroll position is changed due to rendering
     */
    useEffect(() => {
        onRender();
    });

    /*
     * only load initial set of users on the very first render of the address book
     */
    useEffect(() => {
        if (!loadedUsers || loadedUsers.length === 0) {
            dispatch(loadInitialUsers());
        }
    }, [dispatch, loadedUsers]);

    /*
     * re-apply user filter when search or nationalities were changed
     */
    useEffect(() => {
        dispatch(applyUserFilter());
    }, [search, nationalities, dispatch]);

    /*
     * render next users from state, when user scrolled to bottom
     * has a dependency on isFetching as cached users are expected to have changed when fetch finished
     */
    useEffect(() => {
        if (isScrolledToBottom) {
            dispatch(applyUserFilter());
        }
    }, [isScrolledToBottom, isFetching, dispatch]);

    /*
     * pre-mature load next users when user scrolled to bottom
     */
    useEffect(() => {
        if (isScrolledToBottom) {
            dispatch(loadNextUsers());
        }
    }, [isScrolledToBottom, dispatch]);

    /*
     * show errors in notification toasts if present
     */
    useEffect(() => {
        if (error) {
            addToast(error, {appearance: 'error'});
        }
    }, [error, addToast]);

    return (
        <Container className={classes.container}>
            <Grid container className={classes.grid} data-testid="address-book" spacing={3}>
                {
                    (visibleUsers || []).map(user =>
                        <Grid item key={user.login.uuid}>
                            <UserOverview user={user}/>
                        </Grid>
                    )
                }
            </Grid>
            {
                isFetching &&
                <div className={classes.centeredContent} data-testid="fetching-users">
                    <CircularProgress/>
                </div>
            }
            {
                !allUsersLoaded && search &&
                <div className={classes.centeredContent}>
                    <WarningIcon color="primary" className={classes.icon}/>
                    <Typography component="span" data-testid="user-load-on-hold">user catalog loading on hold while
                        search filter is set</Typography>
                </div>
            }
            {
                allUsersLoaded &&
                <div className={classes.centeredContent}>
                    <Typography component="span" data-testid="end-of-users-catalog">end of users catalog</Typography>
                </div>
            }
        </Container>
    );
}

AddressBook.propTypes = {
    isScrolledToBottom: PropTypes.bool.isRequired,
    onRender: PropTypes.func.isRequired
};

AddressBook.defaultProps = {};

export default AddressBook;
