import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';
import {NATIONALITIES} from '../../common/nationalities';
import {setNationalities} from '../../store/settings/settingsActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1rem'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    getContentAnchorEl: null
};


function Settings() {

    const classes = useStyles();
    const selectedNationalities = useSelector(state => state.settings.nationalities);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setNationalities(event.target.value));
    };

    return (
        <Container className={classes.container} data-testid="settings">
            <Typography component="h3">General filter settings</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="nationalities-select-label">Nationalities</InputLabel>
                <Select
                    labelId="nationalities-select-label"
                    id="nationalities-select-checkbox"
                    multiple
                    value={selectedNationalities}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {NATIONALITIES.map((nationality) => (
                        <MenuItem key={nationality.key} value={nationality.key}>
                            <Checkbox checked={selectedNationalities.indexOf(nationality.key) > -1}/>
                            <ListItemText primary={nationality.value}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    );
}

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
