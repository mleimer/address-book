import React, {memo, useState} from 'react';
import UserOverviewDialog from './UserOverviewDialog/UserOverviewDialog';
import Paper from '@material-ui/core/Paper';
import IconWithText from '../../../components/IconWithText';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import {userPropType} from '../../../common/propTypes';

const useStyles = makeStyles(() => ({
    item: {
        padding: '0.5rem'
    },
    image: {
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'

    },
    link: {
        textAlign: 'center'
    }
}));

function UserOverview({user}) {

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Paper className={classes.item} elevation={3}>
                <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className={classes.image}
                     title={`${user.name.first} ${user.name.last}`}/>
                <IconWithText icon={<PersonIcon/>} text={`${user.name.first} ${user.name.last}`}
                              data-testid="user-name"/>
                <IconWithText icon={<AccountCircleIcon/>} text={user.login.username} data-testid="user-login"/>
                <IconWithText icon={<EmailIcon/>} text={user.email} data-testid="user-email"/>
                <div className={classes.link}>
                    <Link href="#" onClick={() => setOpenDialog(true)} data-testid="user-show-details-link">
                        Show Details
                    </Link>
                </div>
            </Paper>
            {
                openDialog &&
                <UserOverviewDialog user={user} open={openDialog} onClose={() => setOpenDialog(false)}/>
            }
        </>
    );
}

function areEqual(prevProps, nextProps) {
    return prevProps.user.uuid === nextProps.user.uuid;
}

UserOverview.propTypes = {
    user: userPropType.isRequired
};

UserOverview.defaultProps = {};

// Memoizing UserOverview to improve performance as user data considered static for same user.uuid
export default memo(UserOverview, areEqual);
