
var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require('request');
var twilio = require('twilio');

var getKingstontemperature = "api/weather/v1/geocode/17.99702/-76.79358/observations.json?units=m&language=en-US";

// Twilio Credentials
var accountSid = '<account-SID>'; // Your Account SID from www.twilio.com/console
var authToken = '<auth-token>';   // Your Auth Token from www.twilio.com/console


// Weather Company Credentials

var url = "<url-from-weather-company-data-service>" + getKingstontemperature;
var client = new twilio(accountSid, authToken);


// Your Twilio Number and Number you want to send text message to.
var myNumber = "<twilio-number>"; // Your Twilio Number
var receiver = "<receiver-number>"; // Receiver Number

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Server index page
app.get("/", function (req, res) {
    res.send("Hello, this is our backend!");
});

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
                    console.log(temperature);
                    if(temperature < 25 ){
                        var msg = "Low Temperature Alert!!" + temperature + "°C";
                        sendMessage(myNumber,receiver, msg);
                    }
                    else if(temperature > 30) {
                        var text = "High Temperature Alert!!" + temperature + "°C";
                        sendMessage(myNumber,receiver, text);

                    }
                    else {
                        var mytext = "";
                        sendMessage(myNumber,receiver, mytext);

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
        console.log("Text message sent to: " + receiverNumber);
        console.log(message.sid);
    });

}

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
