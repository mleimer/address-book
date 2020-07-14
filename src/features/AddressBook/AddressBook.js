import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import loadUsers from '../../store/addressBook/addressBookActions';

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
    }
}));

function AddressBook() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(state => state.addressBook.allLoadedUsers);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

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
        </Container>
    );
}

AddressBook.propTypes = {};

AddressBook.defaultProps = {};

export default AddressBook;
