import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
    },
}));

function AddressBook() {

    const classes = useStyles();

    return (
        <Grid container className={classes.container} data-testid="address-book">
            <Grid item>1</Grid>
            <Grid item>2</Grid>
            <Grid item>3</Grid>
            <Grid item>4</Grid>
            <Grid item>5</Grid>
            <Grid item>6</Grid>
            <Grid item>7</Grid>
            <Grid item>8</Grid>
            <Grid item>9</Grid>
            <Grid item>10</Grid>
        </Grid>
    )
}

AddressBook.propTypes = {};

AddressBook.defaultProps = {};

export default AddressBook;
