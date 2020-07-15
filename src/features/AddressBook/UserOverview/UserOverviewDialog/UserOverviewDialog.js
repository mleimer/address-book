import React from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconWithText from '../../../../components/IconWithText';
import {userPropType} from '../../../../common/propTypes';

function UserOverviewDialog({user, open, onClose}) {
    return (
        <Dialog
            data-testid="user-overview-dialog"
            open={open} onClose={onClose}
            aria-labelledby="user-dialog-title"
            aria-describedby="user-dialog-description"
        >
            <DialogTitle id="user-dialog-title"
                         data-testid="user-dialog-name">{`${user.name.first} ${user.name.last}`}</DialogTitle>
            <DialogContent>
                <IconWithText icon={<LocationOnIcon/>}>
                    <div
                        data-testid="user-dialog-address-line-1">{user.location.street.name} {user.location.street.number}</div>
                    <div
                        data-testid="user-dialog-address-line-2">{user.location.postcode} {user.location.city} ({user.location.state})
                    </div>
                </IconWithText>
                <IconWithText icon={<LocalPhoneIcon/>} text={user.phone} data-testid="user-dialog-phone"/>
                <IconWithText icon={<PhoneIphoneIcon/>} text={user.cell} data-testid="user-dialog-cell"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus data-testid="close-button">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

UserOverviewDialog.propTypes = {
    user: userPropType.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

UserOverviewDialog.defaultProps = {};

export default UserOverviewDialog;

