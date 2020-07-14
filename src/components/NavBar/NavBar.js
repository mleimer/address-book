import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SettingsIcon from '@material-ui/icons/Settings';

function NavBar() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div data-testid={'nav-bar'}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label='Address book' component={Link} icon={<ContactMailIcon/>} to="/"/>
                    <Tab label='Settings' component={Link} icon={<SettingsIcon/>} to="/settings"/>
                </Tabs>
            </AppBar>
        </div>
    );
}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
