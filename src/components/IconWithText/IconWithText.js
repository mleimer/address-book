import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    iconWithText: {
        display: 'flex'
    },
    icon: {
        marginRight: '0.5rem'
    },
    text: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

/**
 * Component to show an icon followed by text or a HTML node
 * @param text: string - the text to be shown (optional; but do not use in combination with children!)
 * @param icon: node - an HTML element representing a Material UI Icon
 * @param children: node(s) - HTML element(s) (optional; but do not use in combination with text!)
 * @param other: any - other attributes set on root element
 * @returns {*} - an HTML element
 */
function IconWithText({text, icon, children, ...other}) {

    const classes = useStyles();

    return (
        <div className={classes.iconWithText} {...other}>
            <div className={classes.icon}>
                {icon}
            </div>
            <div className={classes.text} title={text} data-testid="text-and-children">
                {text}
                {children}
            </div>
        </div>
    );
}

IconWithText.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.node.isRequired,
    children: PropTypes.any
};

IconWithText.defaultProps = {};

export default IconWithText;
