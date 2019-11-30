import React, { Component } from 'react';
import Status from './Status';
import { Line, Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import patternDotsTight from '../images/pattern__dotsTight.jpg';
import patternStripeAngle from '../images/pattern__angleStripe.jpg';
import patternMemphis from '../images/pattern__memphis.png';
import patternPinstripe from '../images/pattern__pinstripe.png';

import '../css/dashboard.css';
import '../css/blades.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bladeStatus: 'hide'
        }
    }

    componentDidMount() {

        // pull the username from the route params
        let screenName = this.props.match.params.username;

        // if there's a username, run the _getData function
        if (screenName) {
            this.props._getData(screenName);
        }

    }

    // TODO: Move these to app.js
    // f- Show the blade
    _openBlade = (content) => {

        this.setState({
        bladeStatus: 'open'
        })

    }

    // f- Close the blade
    _closeBlade = () => {

        this.setState({
        bladeStatus: 'hide'
        })

    }

    // Doughnut Chart: Followers & Following
    ffChartData = (canvas) => {
            
        // create a 2D context
        // const ctx = canvas.getContext("2d");

        // create new Image objects
        let img1 = new Image();
        let img2 = new Image();
        // set the images src to the imported pattern
        img1.src = patternDotsTight;
        img2.src = patternStripeAngle;
        // create a variable to hold the pattern via createPattern()
        // let fillPattern1 = ctx.createPattern(img1, "repeat");
        // let fillPattern2 = ctx.createPattern(img2, "repeat");

        // return the charts data, labels and fills/strokes
        return {
            labels: ['Followers', 'Following'],
            datasets: [{
                data: [this.props.user.totalFollowers, this.props.user.totalFollowing],
                backgroundColor: ['#b61aae', '#f25d9c'],
                borderColor: 'rgba(0,0,0,0)'
            }]
        }
    }


    // Doughnut Chart: Favourites & Retweets
    frChartData = (canvas) => {
            
        // create a 2D context
        // const ctx = canvas.getContext("2d");

        // create new Image objects
        let img1 = new Image();
        let img2 = new Image();
        // set the images src to the imported pattern
        img1.src = patternMemphis;
        img2.src = patternPinstripe;
        // create a variable to hold the pattern via createPattern()
        // let fillPattern1 = ctx.createPattern(img1, "repeat");
        // let fillPattern2 = ctx.createPattern(img2, "repeat");

        // return the charts data, labels and fills/strokes
        return {
            labels: ['Favourites', 'Retweets'],
            datasets: [{
                data: [this.props.user.totalFavorites, this.props.user.totalRetweets],
                backgroundColor: ['#11d3bc', '#c0ffb3'],
                borderColor: 'rgba(0,0,0,0)'
            }]
        }
    }


    // Line Chart: Retweets (with dates)
    rtLineChartData = (canvas) => {

        return {
            // labels: ['1','2','3','4','5','6','7','8','9','10'],
            labels: this.props.datesArr,
            datasets: [
                {
                    label: "Retweets",
                    borderColor: 'rgba(244,89,5,1)',
                    backgroundColor: 'rgba(244,89,5,0.65)',
                    pointRadius: 0,
                    lineTension: 0.2,
                    data: this.props.retweetsArr
                },
            ]
        }
    }


    // Line Chart: Favourites (with dates)
    fvLineChartData = (canvas) => {

        return {
            // labels: ['1','2','3','4','5','6','7','8','9','10'],
            labels: this.props.datesArr,
            datasets: [
                {
                    label: "Favourites",
                    borderColor: 'rgba(16,137,255,1)',
                    backgroundColor: 'rgba(16,137,255,0.65)',
                    pointRadius: 0,
                    lineTension: 0.2,
                    data: this.props.favoritesArr
                }
            ]
        }
    }


    render() {

        // Set chart options          
        let doughnutChartOptions = { 
            responsive: true,
            legend: {
                position: 'bottom'
            }
        }

        let lineChartOptions = { 
            responsive: true,
            maintainAspectRatio: true,
            fill: true,
            backgroundColor: 'rgba(0,0,0,0)',
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(0,0,0,0)'
                    },
                    ticks: {
                        // display: false
                    }
                }],
                yAxes: [{
                    drawTicks: false,
                    ticks: {
                        fontColor: 'rgba(0,0,0,0.33)'
                    },
                    gridLines: {
                        color: 'rgba(0,0,0,0)'
                    }
                }]
            }
        }

        let headerStyles = {
            backgroundImage: `url(${this.props.backgroundGif})`,
            backgroundSize: 'cover',
            opacity: 0.75
        }


        // The Return
        return (
            <article className="dashboard screen">

                <header className="background__header" style={ headerStyles }></header>
                
                {/* Header (quick line and emoji) */}
                <header className="screen__header">

                    <section className="intro">
                        <h1><span className="highlight">{this.props.score}%</span> <Status content={this.props.status.emoji} /></h1>
                        <h2>Sitter score for <strong>@{this.props.currentScreenName}</strong></h2>
                        <br />
                        <h5><button className="btn btn--text" onClick={this._openBlade}>See advanced stats</button></h5>
                        {/* <Status content={this.props.status.emoji} /> */}
                    </section>

                </header>

                <aside className="data">

                    <h5>Quick Stats</h5>

                    <section className="data__item">
                        <figure className="data__item__icon"><i className="far fa-check-square"></i></figure>
                        <h3>Verified</h3>
                        <p>{this.props.user.verified === true ? "YES" : "NO" }</p>
                    </section>

                    <section className="data__item">
                        <figure className="data__item__icon"><i className="far fa-comment"></i> </figure>
                        <h3>Tweets</h3>
                        <p title={this.props.user.totalTweets}>{this.props.user.totalTweetsAbb}</p>
                    </section>

                    <section className="data__item">
                        <figure className="data__item__icon"><i className="far fa-user-circle"></i></figure>
                        <h3>Followers</h3>
                        <p title={this.props.user.totalFollowers}>{this.props.user.totalFollowersAbb}</p>
                    </section>  

                    <section className="data__item">
                        <figure className="data__item__icon"><i className="far fa-user-circle"></i></figure>
                        <h3>Following</h3>
                        <p title={this.props.user.totalFollowing}>{this.props.user.totalFollowingAbb}</p>
                    </section>

                    <section className="data__item">
                        <figure className="data__item__icon"><i className="far fa-heart"></i></figure>
                        <h3>Engagement</h3>
                        <p>{this.props.user.engagement}%</p>
                    </section>

                    <div className="btn__group">
                        <button className="btn btn--small" onClick={this._openBlade}>Advanced Stats</button>
                    </div>

                </aside>

                <article className={'blade ' + this.state.bladeStatus}>

                    <header className="blade__header">
                        <button className="close" onClick={this._closeBlade}><FontAwesomeIcon icon="times" /></button>
                        <h5>Advanced Stats</h5>
                    </header>

                    <article className="charts">

                        <article className="chart__card">
                            <h3>Followers vs Following</h3>
                            <Doughnut data={this.ffChartData} options={doughnutChartOptions} />
                        </article>

                        <article className="chart__card">
                            <h3>Favorites vs Retweets</h3>
                            <Doughnut data={this.frChartData} options={doughnutChartOptions} /> 
                        </article>

                        <article className="chart__card line-chart">
                            <h3>Retweets over time</h3>
                            <Line data={this.rtLineChartData} options={lineChartOptions} height={200} />
                        </article>

                        <article className="chart__card line-chart">
                            <h3>Favourites over time</h3>
                            <Line data={this.fvLineChartData} options={lineChartOptions} height={200} />
                        </article>

                    </article>

                </article>

            </article>
        );
    }
}

export default Dashboard;