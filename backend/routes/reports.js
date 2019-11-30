
// import some stuff
const   express = require('express'),
        router = express.Router(),
        Twitter = require('twitter'),
        calculateScore = require('../lib/score'),
        calculateEngagement = require('../lib/engagement'),
        reduceNumber = require('../lib/reduceNumber');

try { 
    var config = require('../lib/config');
} catch (err) { 
    return false;
}


// Twitter API Credentials
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY || config.CONSUMER_KEY,
 	consumer_secret: process.env.CONSUMER_SECRET || config.CONSUMER_SECRET,
 	access_token_key: process.env.ACCESS_TOKEN_KEY || config.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET
});

const tweetAmount = process.env.TWEET_AMT || config.TWEET_AMT;


// GET endpoint for /api/reports/:username
router.get('/reports/:username', (req, res) => {

    // set the username
    let screenName = req.params.username;

    // create empty payload object
    let payload = {
        score: 0,
        user: {},
        tweets: []
    }

    // GET twitter /api/users/show
    client.get('users/show', { screen_name: screenName })

        .then(results => {

            // Update our payload object with the user data
            payload.user = {
                id: results.id,
                url: results.url,
                avatar: results.profile_image_url_https,
                backgroundImage: results.profile_banner_url,
                joinDate: results.created_at,
                verified: results.verified,
                totalTweets: results.statuses_count,
                totalTweetsAbb: reduceNumber(results.statuses_count),
                totalFollowers: results.followers_count,
                totalFollowersAbb: reduceNumber(results.followers_count),
                totalFollowing: results.friends_count,
                totalFollowingAbb: reduceNumber(results.friends_count),
                totalFavorites: 0,
                totalFavoritesAbb: 0,
                totalRetweets: 0,
                totalFavoritesAbb: 0,
                engagement: 0
            }

            return client.get('statuses/user_timeline', { screen_name: screenName, include_rts: false, count: 200 });

        })

        .then(results => {
            
            // get total retweet number (last 200)
            let totalRetweets = results.reduce((acc, curr) => {
                return acc + curr.retweet_count
            }, 0);

            // get total favourites number (last 200)
            let totalFavorites = results.reduce((acc, curr) => {
                return acc + curr.favorite_count
            }, 0);

            // update payload with numbers
            payload.user.totalRetweets = totalRetweets;
            payload.user.totalRetweetsAbb = reduceNumber(totalRetweets);
            payload.user.totalFavorites = totalFavorites;
            payload.user.totalFavoritesAbb = reduceNumber(totalFavorites);


            // Decide how many tweets to loop through
            let tweetsToPush = tweetAmount;
            if (results.length < tweetAmount) {
                tweetsToPush = results.length;
            }

            // Update our payload object with array of last (n) tweets
            for (let i = 0; i < tweetsToPush; i++) {

                let theTweet = {
                    id: results[i].id || 0,
                    created_at: results[i].created_at || '',
                    retweet_count: results[i].retweet_count || 0,
                    favorite_count: results[i].favorite_count || 0
                }

                payload.tweets.push(theTweet);

            }

            return payload;

        })

        .then(payload => {

            // Run through the calculate score function
            payload.score = calculateScore(payload.user.verified, payload.user.totalFollowers, payload.user.totalFollowing, payload.user.totalTweets, payload.user.totalFavorites, payload.user.totalRetweets, payload.user.joinDate);

            // Run through the calculate engagement function
            payload.user.engagement = calculateEngagement(payload.user.totalFavorites, payload.user.totalRetweets, payload.user.totalFollowers);

            // return an OK status and send the payload
            res.status(200).json(payload);

        })

        .catch(error => {

            // log the error
            console.log('GET users/tweets error:', error);

            // send response
            res.status(502).send('Could not get user.');

        })

});


// CATCH ALL for /api/reports/*
router.all('/reports/*', (req, res) => {

    // send back a 404 status and message
    res.status(404).send('Nothing found.');

});
        

// export
module.exports = router;