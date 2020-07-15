import React, {useState} from 'react';
import MaterialAppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link, useLocation} from 'react-router-dom';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SettingsIcon from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {setSearch} from '../../store/navBar/navBarActions';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));


function getInitialSelectedTabIndexFromRoute(location) {
    switch (location.pathname) {
        case '/settings':
            return 1;
        default:
            return 0;
    }
}

function AppBar() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedTabIndex, setSelectedTabIndex] = useState(getInitialSelectedTabIndexFromRoute(location));
    const searchFieldValue = useSelector(state => state.navBar.search);

    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue);
    };

    const handleSearchValueChange = (event) => {
        dispatch(setSearch(event.target.value));
    };

    return (
        <div data-testid="nav-bar">
            <MaterialAppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Tabs value={selectedTabIndex} onChange={handleTabChange} centered>
                        <Tab label='Address book' component={Link} icon={<ContactMailIcon/>} to="/"
                             data-testid="address-book-tab"/>
                        <Tab label='Settings' component={Link} icon={<SettingsIcon/>} to="/settings"
                             data-testid="settings-tab"/>
                    </Tabs>
                    {
                        selectedTabIndex === 0 &&
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{'aria-label': 'search', 'data-testid': 'search-field'}}
                                onChange={handleSearchValueChange}
                                value={searchFieldValue}
                            />
                        </div>
                    }
                </Toolbar>
            </MaterialAppBar>
        </div>
    );
}

AppBar.propTypes = {};

AppBar.defaultProps = {};

export default AppBar;
