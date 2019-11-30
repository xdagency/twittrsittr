import React from 'react';
// import Status from './Status';
import '../css/home.css';

const Home = (props) => {

    let headerStyles = {
        backgroundImage: `url(${props.backgroundGif})`,
        backgroundSize: 'cover'
    }

    return (
        <article className="home screen">

            <header className="background__header" style={ headerStyles }></header>

            <header className="screen__header">

                <section className="intro">
                    <h2>Search for a twitter handle to get started <span role="img" aria-label="Search above">☝️</span></h2>
                    {/* <Status content={props.status.emoji} /> */}
                </section>

            </header>
            
        </article>
    );
}

export default Home;