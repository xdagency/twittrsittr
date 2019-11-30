

// f- Calculate engagement
// This function takes in the criteria for engagement and calculates the engagement percentage
// favorites: int, followers: int, retweets: int
function calculateEngagement(favorites, retweets, followers) {

    let engagement = 0;

    // Setting Engagement Rate to two decimal places only. 
    engagement = parseFloat((favorites + retweets) / (followers) + '').toFixed(2) * 100;

    // if engagementRate is NaN after doing the calculation, set to zero.
    if (isNaN(engagement)) {
        engagement = 0;
    }

    return engagement.toPrecision(3);

}

module.exports = calculateEngagement;