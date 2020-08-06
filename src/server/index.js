const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')

var axios = require("axios");

var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

// Create an instance of express
const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

// Apply express to the dist folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// GET ROUTE - return the projectData object in the server code
app.get("/test", function (req, res) {
    const name = req.query.name;
    axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${name}&model=general&lang=en`, {})
        .then(function (response) {
            const result = response.data;
            projectData["sentence"] = name;
            projectData["subjectivity"] = result.subjectivity;
            res.send(projectData);
            res.end();
        })
        .catch(function (error) {
            console.log(error);
            res.end();
        })
})