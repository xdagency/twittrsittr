
// import some stuff
const config = require('../lib/config');

// f- Calculate score
// This function takes in the criteria for scoring and calculates the total score
// verified: boolean, followers: int, following: int, tweets: int, favorites: int, retweets: int, ratio: boolean, joinDate: date
function calculateScore(verified, followers, following, tweets, favorites, retweets, joinDate) {

    let score = 0;
    let engagement = parseFloat((favorites + retweets) / followers).toFixed(2) * 100;
    let currentDate = new Date().getTime();
    let joinedDate = new Date(joinDate).getTime();
    let tenYears = 3650 * 24 * 60 * 60 * 1000;

    // Verified
    if (verified === true) { score += 20; }

    // Followers
    if(followers > 1000000) { score += 20; } 
    else if (followers > 100000) { score += 15; } 
    else if (followers > 1000) { score += 10; } 
    else if (followers > 100) { score += 5; } 
    else if (followers > 10) { score += 1; }
    else { score += 0; }

    // Total tweets
    if(tweets > 1000) { score += 20; } 
    else if (tweets > 750) { score += 15; } 
    else if (tweets > 500) { score += 10; } 
    else if (tweets > 250) { score += 5; } 
    else if (tweets > 100) { score += 1; } 
    else { score += 0; }

    // Engagment
    if (engagement > 70) { score += 30; } 
    else if (engagement > 20) { score += 20; } 
    else if (engagement > 2) { score += 10; } 
    else { score += 0; }

    // Ratio
    if (followers > following) { score += 8; }

    // Years since joining
    if (currentDate - joinedDate > tenYears) { score += 2; }

    return score;

}

module.exports = calculateScore;