import PropTypes from 'prop-types';

export const userPropType = PropTypes.shape({
    name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
        street: PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        }).isRequired,
        postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
    }).isRequired
});
