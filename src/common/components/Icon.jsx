import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ path, ...otherProps}) {
    return (
        <svg viewBox="0 0 24 24" {...otherProps}>
            <path d={path}/>
        </svg>
    )
}

Icon.propTypes = {
    path: PropTypes.string
};
