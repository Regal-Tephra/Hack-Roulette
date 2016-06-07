[![Stories in Ready](https://badge.waffle.io/Regal-Tephra/Hack-Roulette.png?label=ready&title=Ready)](https://waffle.io/Regal-Tephra/Hack-Roulette)
# Project Title

Hack Roulette is a platform for receiving prompt help to solve your coding bugs or challenges. Log in with your github account and either receive or give help. Through our platform, you can get real time support through webcam and also participate in a shared text editor so both parties can contribute to the discussion. 

## Main Features
* Multi-Page Single Page Application with a full feature front end and backend
* Full marketplace with helpers (people providing coding help) and helpees (people looking for help)
* Used sockets.io for our real-time text editor 
* Webcam using Icecomm API
* Persistent data using mongoDB to keep track of times helped, and times requesting help

## Getting Started

1. Fork and clone repo locally
2. Npm install
3. Bower install
4. Ensure node and mongodb are installed
5. Create keys.js file to store private api keys
⋅⋅* API dependencies are [github auth](https://developer.github.com/v3/oauth/) and [icecomm](https://icecomm.io/)
6. Run nodemon server/server.js from root directory
7. Connect to localhost:3000 on the browser
⋅⋅* Please use Google Chrome for best experience


## Built With

* React - Front End Framework
* React-router
* Express - Node.js Web Application Framework
* Node.js - Javascript Backend
* MongoDB / Mongoose - NoSQL Database
* Github Oauth/Passport
* Bootstrap
* Icecomm API - please ensure you use the provided version of icecomm.js 
* Passport - with Github Auth 2
* Socket.io
* Grunt
* ESLint - Airbnb Styleguide
* Love <3

## Additional Features to Build Out

* Code Editor: Make code editor much more robust by adding line count, adding ability to import files, change language formatting , etc.
* WebCam: Add ability to add multiple parties into 
* Gamify the whole experience. Add badges to user profile based on number of users helped in languages, etc.
* Build out feedback & rating system - kind of like Uber’s 5 star system
* Refactor using Redux

## Product Photos

![landingPage](https://github.com/Regal-Tephra/Hack-Roulette/blob/master/readMeAssets/landingPage.png)
![getHelpView](https://github.com/Regal-Tephra/Hack-Roulette/blob/master/readMeAssets/getHelpView.png)
![helperView](https://github.com/Regal-Tephra/Hack-Roulette/blob/master/readMeAssets/helperView.png)
![profileExample](https://github.com/Regal-Tephra/Hack-Roulette/blob/master/readMeAssets/profileView.png)

## File Structure
├── node_modules                  
├── public
|   ├── components                   
│   ├── css      
│   |   ├── landingPage.css  
│   |   └── styles.css 
│   ├── dependencies
│   |   └── icecomm.js     
│   ├── img
│   |   ├── hack-roulette-logo-1.png
│   |   └── nohelpneeded.jpg
|   ├── login
│   |   ├── codingphoto3.jpg
│   |   └── index.html
|   ├── views
│   |   ├── pageComponents
|   |   |   ├── mainPageForm.jsx
|   |   |   └── NavbarView.jsx
│   |   ├── AppView.jsx 
│   |   ├── FeedbackView.jsx
│   |   ├── HelperView.jsx
│   |   ├── LandingPageView.jsx
│   |   ├── MainpageView.jsx
│   |   └── ScreenShareView.jsx
|   └── index.html                  
├── server
|   ├── data
│   |   └── db                     
│   ├── helpRequestsListeners.js         
│   ├── request-handlers.js        
│   ├── routes.js
|   ├── screenshareRequestsListeners.js
|   ├── screenshareRequestsListeners.js
|   └── setupPassport.js             
├── test 
|   └── tests.js                                
├── bower.json
├── example_keys.js
├── package.json
├── testrunner.html
└── README.md

## Authors

[Felix Feng](https://github.com/felix2feng)
[Aaron Freidus](https://github.com/shadowfool) - @golduck
[Austin Baltes](https://github.com/austinba)
[Andy Tran](https://github.com/adtran117)

## License

This project is licensed under the MIT License




