import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/modals.css';

const Modal = (props) => {
    return (
        <article className={'modal__wrapper ' + props.status}>
            <figure className="modal">
                <button className="close" onClick={props._closeModal}><FontAwesomeIcon icon="times" /></button>
                {props.content}
            </figure>
        </article>
    );
}

Modal.propTypes = {
    content: PropTypes.string
};

Modal.defaultProps = {
    class: 'closed',
    content: '...'
};

export default Modal;