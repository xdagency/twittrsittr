import React from 'react';
import PropTypes from 'prop-types';
import '../css/inputs.css';

const Input = (props) => {
    return (
        <div className={'input ' + props.class}>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} id={props.name} value={props.inputValue} onChange={props.updateValue} />
        </div>
    );
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
};

Input.defaultProps = {
    class: '',
    label: '',
    type: 'text',
    name: '',
    placeholder: ''
};
    
export default Input;