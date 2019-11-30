import React from 'react';
import '../css/loader.css';

const Loader = (props) => {

    let bgStyles = {
        backgroundImage: `url(https://media.giphy.com/media/IW8v4AX8GgwM/giphy.gif)`,
        backgroundSize: 'cover'
    }
    
    return (
        <article className={'loader ' + props.status} style={ bgStyles }>
            <figure className="loader__indicator"> <span role="img" aria-label="loading">🏄‍</span></figure>
        </article>
    );
}

Loader.defaultProps = {
    status: 'hide'
};
    
export default Loader;