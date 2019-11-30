/*
    Setup
*/

// import some stuff
const express = require('express'), 
      app = express(),
      bodyParser = require('body-parser'),
      request = require('request'),
      reportsRoutes = require('./routes/reports');


// set some stuff

// PORT
const PORT = process.env.PORT || 8080;



/* 
    Middleware stack 
*/

// headers to fix CORS issues
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Mount routes
app.use('/api', reportsRoutes);

// Catch all GET route
app.get('/*', (req, res, next) => {
    // Send the homepage
    res.sendFile(__dirname + '/public/index.html');
});


/*
    Listen
*/

app.listen(PORT, () => {
    console.log("Server is good to go. Up on", PORT)
});