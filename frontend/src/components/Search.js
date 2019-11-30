import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/inputs.css';
import '../css/buttons.css';
import '../css/search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // screenName: this.props.screenName
        }
    }

    _onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`/${this.props.screenName}`);
        this.props._onSubmit(this.props.screenName);
    }


    render() {

        return (
            <article className="search form">

                <form name="username_search" autoComplete="off" onSubmit={(e) => { this._onSubmit(e) }}>
                    <span className="at">@</span>
                    <input type="text" ref="username" className="input" onChange={this.props._onInputChange} placeholder="Enter a valid Twitter handle." value={this.props.screenName} required />
                    <button type="submit" className="btn btn--submit">Search</button>
                </form>

            </article>
        );
    }

}

export default withRouter(Search);