import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <div className={'btn ' + props.class}>
            <button onClick={(e) => { props._onClick(e, props.parameter)}}>{props.text}</button>
        </div>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    class: PropTypes.string
};

Button.defaultProps = {
    class: 'btn--default',
    text: 'Button',
    to: '/',
    parameter: ''
};
    
export default Button;