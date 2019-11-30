import React from 'react';
import '../css/status.css';

const Status = (props) => {
    return (
        <figure className={'status ' + props.class}>
            <h1>‍‍‍‍‍‍{props.content}</h1>
        </figure>
    );
}

Status.defaultProps = {
    class: '',
    content: '🤷‍'
};
    
export default Status;