# csci3230-restaurant-reservations

**Contributors**

- Gajan Sivanesan (GajanSivanesan)
- Geerthan Srikantharajah (Geerthan)
- Luke Tran (Luke-Tran)
- Rutvik Desai (Rutvik7359)

---

### Install Instructions

This application can simply be cloned from GitHub, but will require an installation of MongoDB, Node.js, npm, and a few npm plugins in order to work. The download links for MongoDB and npm are found below.

MongoDB: https://www.mongodb.com/download-center/community

Node.js / npm: https://nodejs.org/en/

Once these are installed, go to the project directory and run this: 
`> npm install`

To set up your phone number to work with the application, you will need to verify it with Twilio (as this is the free tier). First, login using the information below.

Website: https://www.twilio.com/login

Email: geerthan.srikantharajah@gmail.com

Password: csci 3230u final

Once you have logged in, go to this link and verify your phone number to let the app send you text messages.

Verification link: https://www.twilio.com/console/phone-numbers/verified

### Start-up Instructions

From a console, go to the project's directory and enter this: 

`> start.bat`

If you have issues running the batch script, run these individual commands in three terminals instead.
```
> mongod --dbpath db
> node db_man.js
> node index.js
```

The site can then be accessed from localhost:3000 in a web browser.
