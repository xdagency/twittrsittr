import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import { join } from 'path';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Modal from './components/Modal';
import Loader from './components/Loader';

import './css/styles.css';

library.add(faTimes);

class App extends Component {

  constructor(props) {
    super(props);

    /* our state */
    this.state = {

      // backend
      host: 'http://localhost:8080',
      // host: 'https://twittrsittr.herokuapp.com',

      // show or hide dashboard
      dashboardStatus: 'hide',
      error: false,

      // Data received from BE API
      score: 0,
      screenName: '',
      currentScreenName: '',
      user: {
        id: '',
        url: '',
        avatar: '',
        backgroundImage: '',
        joinDate: '',
        verified: false,
        totalTweets: 0,
        totalTweetsAbb: 0,
        totalFollowers: 0,
        totalFollowersAbb: 0,
        totalFollowing: 0,
        totalFollowingAbb: 0,
        totalFavorites: 0,
        totalFavoritesAbb: 0,
        totalRetweets: 0,
        totalRetweetsAbb: 0,
        engagement: 0
      },
      tweets: [],
      retweetsArr: [],
      favoritesArr: [],
      datesArr: [],

      //status
      status: {
        text: '',
        emoji: '‍‍‍‍‍‍🤷‍'
      },

      // Modals
      modalStatus: 'hide',
      modalContent: '.....',

      // Loader
      loaderStatus: 'hide',

      // Background
      backgroundGif: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/source.gif'

    }
  };


  // f- Input change function for search form
  _onInputChange = (e) => {
    e.preventDefault();
    this.setState({
        screenName: e.target.value
    })
  }


  // f- when a user uses the search form
  _onSubmit = (username) => {

    // run the _getData function
    this._getData(username);

    // make dashboard visible
    this.setState({
        dashboardStatus: 'show'
    });

  }
  

  // f- When a user submits a twitter handle on the front end
  // This function will send a post request to the back end and
  // get all the data back in 1 payload
  // then sets the dashboard state to show the dashboard
  // TODO: turn this into a router instead
  _getData = (username) => {

    // first, initialize loading state
    this.setState({
      loaderStatus: 'show'
    }, () => {

      // then, make post request to our server
      axios.get(this.state.host + '/api/reports/' + username)

      .then(results => {

        console.log(results.data);

        // when we have results back save them to state
        this.setState({
          score: results.data.score,
          user: {
            id: results.data.user.id,
            url: results.data.user.url,
            avatar: results.data.user.avatar,
            backgroundImage: results.data.user.backgroundImage,
            joinDate: results.data.user.joinDate,
            verified: results.data.user.verified,
            totalTweets: results.data.user.totalTweets,
            totalTweetsAbb: results.data.user.totalTweetsAbb,
            totalFollowers: results.data.user.totalFollowers,
            totalFollowersAbb: results.data.user.totalFollowersAbb,
            totalFollowing: results.data.user.totalFollowing,
            totalFollowingAbb: results.data.user.totalFollowingAbb,
            totalFavorites: results.data.user.totalFavorites,
            totalFavoritesAbb: results.data.user.totalFavoritesAbb,
            totalRetweets: results.data.user.totalRetweets,
            totalRetweetsAbb: results.data.user.totalRetweetsAbb,
            engagement: results.data.user.engagement
          },
          tweets: results.data.tweets,
          screenName: username,
          currentScreenName: username,
          status: this.setStatus(results.data.score),
          dashboardStatus: 'show',
          loaderStatus: 'hide'
        });

      })

      .then(result => {

        let datesArr = this.mapArray(this.state.tweets, 'created_at');

        this.setState({
          retweetsArr: this.mapArray(this.state.tweets, 'retweet_count').reverse(),
          favoritesArr: this.mapArray(this.state.tweets, 'favorite_count').reverse(),
          datesArr: this.condenseDates(datesArr).reverse()
        }, () => {

          this.setBackground(this.state.status.text);

        })

      })

      .catch(error => {

        this.setState({
          loaderStatus: 'hide',
          error: true
        })
        
        // Do something with error
        this._openModal('Sorry we couldn\'t get stats for that user.');

        // Log error
        console.log('Axios GET request error:', error);

      })

    })
    
  }


  // f- Map an array of objects to an array of values
  mapArray = (arr, attribute) => {

    let mappedArray = arr.map(elem => {
        return elem[attribute];
    });

    return mappedArray;

  }


  // f- Condense dates in dates array
  condenseDates = (arr) => {

    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let condensedArray = arr.map((elem, i) => {

      let month = new Date(elem).getMonth() + 1;
      let day = new Date(elem).getDate();
      let year = new Date(elem).getFullYear();

      return `${month}/${day}/${year}`;

    });

    return condensedArray;

  }


  // f- Set the header status (emoji)
  setStatus = (score) => {

    // Change status emjoi based on score
    let status = {
      text: '',
      emoji: '‍‍‍‍‍‍🤷‍‍‍‍‍‍'
    };

    if (score < 20) { 
      status.text = 'this is the worst';
      status.emoji = '🤦‍';
    } else if (score < 40) { 
      status.text = 'fail';
      status.emoji = '🙍' 
    } else if (score < 60) { 
      status.text = 'meh';
      status.emoji = '😬' 
    } else if (score < 80) { 
      status.text = 'ok';
      status.emoji = '🙆‍' 
    } else { 
      status.text = 'success';
      status.emoji = '🤸' 
    }

    return status;

  }


  setBackground = (q) => {

    let offset = Math.floor(Math.random() * 5);

    // GET the Giphy search endpoint with our query
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=zhPeVnmOm3XV4SI5rFWmpgcHnpL6sOrO&q=${q}&limit=1&offset=${offset}&rating=PG&lang=en`)

        .then(results => {

          // Set the background Gif image based on what's returned from giphy
          this.setState({
            backgroundGif: results.data.data[0].images.original.url
          })

        })

        .catch(error => {

            // log the ERROR
            console.log('GET GIPHY ERROR:', error);

        })

  }


  // f- Show the modal with some custom content
  _openModal = (content) => {

    this.setState({
      modalStatus: 'open',
      modalContent: content
    })

  }


  // f- Close the modal
  _closeModal = () => {

    this.setState({
      modalStatus: 'hide',
      modalContent: ''
    })

  }


  render() {

      // If the data fetch returns an error, redirect to an error page
      // if (this.state.error) { return <Redirect to="/" /> }

      // If there's a background image in the user object set it as the page BG
      let appStyles = {
        // backgroundImage: 'url(' + this.state.user.backgroundImage + '/1500x500)'
      }

      // otherwise render the applicable route
      return (
        <div className={'app dashboard--' + this.state.dashboardStatus} style={appStyles}>

          <main className="wrapper">

            {/* <h1 className="app__title">Twitter Sitter</h1> */}

            <Search _onSubmit={this._onSubmit} _onInputChange={this._onInputChange} screenName={this.state.screenName} />

            <Switch>

              <Route path="/" exact render={(props) => { return <Home match={props.match} status={this.state.status} backgroundGif={this.state.backgroundGif} /> }} />

              <Route path="/:username" render={(props) => { return <Dashboard match={props.match} 
                    _getData={this._getData} 
                    reduceNumber={this.reduceNumber} 
                    score={this.state.score} 
                    user={this.state.user} 
                    tweets={this.state.tweets} 
                    retweetsArr={this.state.retweetsArr} 
                    favoritesArr={this.state.favoritesArr} 
                    datesArr={this.state.datesArr} 
                    screenName={this.state.screenName} 
                    currentScreenName={this.state.currentScreenName} 
                    status={this.state.status} 
                    backgroundGif={this.state.backgroundGif} /> }} />

            </Switch>

            <Modal status={this.state.modalStatus} content={this.state.modalContent} _closeModal={this._closeModal} />

            <Loader status={this.state.loaderStatus}  />

          </main>

        </div>
      );
    }
}

export default App;
