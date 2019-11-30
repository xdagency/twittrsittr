
// f- number reducer
// This function will take a raw number, round it, and abbreviate it
// i.e. 165,875 -> 166K | 1,203,934 -> 1.20M
reduceNumber = (number) => {

    // set the abbreviated number to the number
    let abbNumber = number;
    // create an array of suffixes to attach to the abbreviated number
    let suffixes = ['', 'K', 'M', 'B', 'T'];
    // set the default suffix to 0 (blank)
    let suffixNum = 0;
    // set the precision of the number
    let precision = 1;

    // loop through the number
    // while the number is greater or equal to 1,000 divide the number by 1,000, step up on the suffix array, and loop again
    while (abbNumber >= 1000) {
        abbNumber /= 1000;
        suffixNum++;
    }
    
    // Set the precision based on a combination of the number and suffix
    if (abbNumber < 10 && suffixNum === 0) { precision = 1; }
    else if (abbNumber < 100 && suffixNum === 0) { precision = 2; } 
    else { precision = 3; }
    
    abbNumber = abbNumber.toPrecision(precision);

    // return the number + the abbreviation
    return abbNumber += suffixes[suffixNum];

}

module.exports = reduceNumber;