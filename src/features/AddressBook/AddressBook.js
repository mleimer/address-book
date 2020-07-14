import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {loadInitialUsers, loadNextUsers, showUsers} from '../../store/addressBook/addressBookActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    container: {
        padding: '1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
    },
    item: {
        overflow: 'hidden'
    },
    centeredContent: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '12px',
        padding: '12px'
    }
}));

function AddressBook({isScrolledToBottom, onRender}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(state => state.addressBook.visibleUsers);
    const allUsersLoaded = useSelector(state => state.addressBook.allUsersLoaded);
    const isFetching = useSelector(state => state.addressBook.isFetching);
    const [showAllUsersLoadedMessage, setShowAllUsersLoadedMessage] = useState(false);

    useEffect(() => {
        onRender();
    });

    useEffect(() => {
        dispatch(loadInitialUsers());
    }, [dispatch]);

    useEffect(() => {
        if (!isFetching && isScrolledToBottom) {
            dispatch(showUsers());
            if (allUsersLoaded) {
                setShowAllUsersLoadedMessage(true);
            } else {
                dispatch(loadNextUsers());
            }
        }
    }, [allUsersLoaded, isFetching, isScrolledToBottom, setShowAllUsersLoadedMessage, dispatch]);

    return (
        <Container className={classes.container}>
            <Grid container className={classes.grid} data-testid="address-book" spacing={3}>
                {
                    (users || []).map(user =>
                        <Grid item key={user.login.uuid}>
                            <Paper className={classes.item} elevation={3}>
                                <pre>{JSON.stringify(user, null, 2)}</pre>
                            </Paper>
                        </Grid>
                    )
                }
            </Grid>
            {
                isFetching &&
                <Container className={classes.centeredContent}>
                    <CircularProgress/>
                </Container>
            }
            {
                showAllUsersLoadedMessage &&
                <Container className={classes.centeredContent}>
                    <Typography component="body1">end of users catalog</Typography>
                </Container>
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
