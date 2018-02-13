
var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require('request');
var twilio = require('twilio');
var accountSid = 'AC81f9426ef6ec4f0613dd887332a2e288'; // Your Account SID from www.twilio.com/console
var authToken = '2fb3816badfa4e1848053fb3c596177a';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

// Weather Company Credentials
var username = "b5a5f1f9-5d84-4448-930e-1232f5814afc",
    password = "3kO09TaoXU",
    url = "https://" + username + ":" + password + "@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/17.99702/-76.79358/observations.json?units=m&language=en-US";

// Twilio Credentials
var myNumber = "+12019037695"; // Your Twilio Number
var receiver = "+254728218370"; // Receiver Number

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Server index page
app.get("/", function (req, res) {
    res.send("Hello, this is our backend!");
});

var temperature;
setInterval(function () {
    var temperature;
    request(
        {
            url : url
        },
        function (error, res, body) {

            var data = JSON.parse(body);
            for(var a in data){
                if(a === "observation") {
                    var b = data[a];
                    temperature = b.temp;
                    if(temperature > 30 ){
                        var msg = "High Temperature Alert!";
                        sendMessage(myNumber,receiver, msg)
                    }
                    else {
                        var text = "Everything is ok";
                        sendMessage(myNumber,receiver, text)

                    }

                }
            }


        }
    );

}, 5000);

function sendMessage(twilioNumber,receiverNumber,text) {

    client.messages.create({
        body: text,
        to: receiverNumber,
        from: twilioNumber
    }).then (function (message) {
        console.log(message.sid);
    });

}

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
