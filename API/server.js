//Use Express middleware to manage incoming requests and 
//dispatch them to corresponding behaviours
const express = require('express');
var cors = require('cors');


//Use chalk to add colours on the console
const chalk = require('chalk');

//to access form data
let bodyParser = require('body-parser');

//The 404 middleware used when an incoming request
//hits a wrong route
const http404 = require('./middleware/route404');

//Access the path 
const path = require('path');

//Used for logging
const morgan = require("morgan");

//Add more logging
const {loggers, transports, format} = require("winston");

//Accessing MongoDB
const mongoose = require('mongoose');

//Create an application 
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
      origin: function(origin, callback) {
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
              var msg =
                  "The CORS policy for this site does not " +
                  "allow access from the specified Origin.";
              return callback(new Error(msg), false);
          }
          return callback(null, true);
      }
  })
); 
//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());
  
//Use the morgan logging 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//Define the loggers for Winston
loggers.add('infoLogger', {
    level: 'info',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/info.log')})],
    format: format.printf((info) => {
      let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
      return message
    })
});

loggers.add('errorLogger', {
    level: 'error',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/error.log')})],
    format: format.printf((info) => {
      let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
      return message
    })
});

const infoLogger = loggers.get('infoLogger');

//Connecting to MongoDB (async/await approach)
const connectDb = async () => {
    await mongoose.connect('mongodb+srv://root:root@cluster0.tjbhq.mongodb.net/pizzeria?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(chalk.green(`Connected to database`))
            infoLogger.info("Connected to database");
        },
        error => {
            console.error(chalk.red(`Connection error: ${error.stack}`))
            process.exit(1)
        }
    )
  }
  
  connectDb().catch(error => console.error(error))

  
//Accessing the routes for the user
const pizzeriaRoutes = require('./routes/pizza');
const pizzeriaIngredients = require('./routes/ingredient');
const pizzeriaClients = require('./routes/client');
const pizzeriaCommandes = require('./routes/commande');

require('./models/client');
require('./models/commande');
require('./models/ingredient');
require('./models/pizza');


//Acces the routes 
app.use('/api/v1/', pizzeriaRoutes);
app.use('/api/v1/', pizzeriaIngredients);
app.use('/api/v1/', pizzeriaClients);
app.use('/api/v1/', pizzeriaCommandes);


//When there is no route that caught the incoming request
//use the 404 middleware
app.use(http404.notFound);

//Listen on the port 3000
app.listen(3000, () => {
    //Add info to the loggers
    infoLogger.info('Server is running on port: 3000');

});

//Print out where the server is
console.log(chalk.green("Server is running on port: 3000"));