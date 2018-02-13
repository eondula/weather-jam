
# Weather Alert SMS Bot
This is a starter application to get started with building an SMS bot that sends extreme weather conditions alerts to a user.
This application is built using[Node js]()and uses the[Weather Company API on IBM Cloud]() and[Twilio]() an SMS service. Once deployed the Weather Alert Service will be checking temperature after every five seconds for extreme values. An SMS alert will then be send if temperatures are below 25°C and above 30°C


The following steps are the general procedure to set up and deploy your app to IBM Cloud. 

## Before you begin
1. You'll need to create an [IBM Cloud account](https://console.ng.bluemix.net/registration/) and [Twilio account](https://www.twilio.com/login).
2. Install the following:
    * [Git](https://git-scm.com/downloads)
    * [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)
    * [Node.js](https://nodejs.org/en/) 
3. Log in to your IBM Cloud account and create Weather Company Data service.
4. Click on your service and go to Service Credentials and create New credentials. [View Instructions here](https://console.bluemix.net/docs/services/Weather/index.html)
5. Log in to your Twilio account and get a Twilio phone number [View Instructions here](https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-)
6. Get your Twilio Account SID and Auth Token [Follow these Instructions here](www.twilio.com/console)
### Installation and Running the App Locally

- Run the following on your terminal to a folder of your choice after installing the above dependencies.
```sh
$ git clone https://github.com/leezie/weather-jam.git
$ cd weather-jam
```
- Install the node modules 
```sh
$ npm install
```

- Go to the ```app.js ``` and find the url from the Weather Company Data service credentials, twilio account sid and auth token and twilio number and text message receiver number.

``` node js
// Twilio Credentials
var accountSid = '<account-SID>'; // Your Account SID from www.twilio.com/console
var authToken = '<auth-token>';   // Your Auth Token from www.twilio.com/console
``` 
 ``` node js
// Weather Company Credentials

var url = "<url-from-weather-company-data-service>" + getKingstontemperature;
var client = new twilio(accountSid, authToken);
 ```
 ``` node js
// Your Twilio Number and Number you want to send text message to.
var myNumber = "<twilio-number>"; // Your Twilio Number
var receiver = "<receiver-number>"; // Receiver Numbe

```

- Start the app locally by running the following command on the terminal.
```sh                 
$ node app.js 
```

### Running the App on IBM Cloud

- To deploy this application to the cloud, first lets edit the ```manifest.yml ``` file. Change the name to the name you wish for your app to be.
- Assuming you have already gone through installation and setting up Cloud Foundry, run the following commands.
```sh                  
$ cf api https://api.ng.bluemix.net
$ cf login -u your_user_ID -p ***** -o your_org_name -s your_space_name
$ cf push      
```

## Next Steps     

Coming Soon!!

The next tutorial after this will include integration with Watson Conversation Service and processing messages from a user.              