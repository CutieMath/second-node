
const startupDebugger = require('debug')('app:startup'); // the second is argument
const dbDebugger = require('debug')('app:db'); // if only one used, can use variable name "debug"
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger') // from local module
const express = require('express');
const app = express();
const courses = require('./courses'); // from local module

// HTML Markup
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
// use middleware from local module
app.use(logger); 
// use built-in middleware
app.use(express.static('public'));
// use third party middleware
app.use(helmet()); // secure HTTP request
// app.use(morgan('tiny')); // log the http request
app.use('/api/courses', courses); // from local module

// Configuration 
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Server: ' + config.get('mail.password'));

// use environment variables
// process.env.NODE_ENV = app.get('env')
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...'); // use the debug package for console.log
}

// DB debug:
dbDebugger('Connected to the db...');

// code used to set up which debug we want to use
// export DEBUG=app:*                  // wild card
// export DEBUG=app:startup,app:db     // both startup and db
// export DEBUG=app:startup            // just startup
// export DEBUG=                       // none
// DEBUG=app:db nodemon app.js         // short cut to run the app


// ============
// Get Requests
// ============
app.get('/', (req, res) => {
    // res.send('Yummy Yummy x');
    res.render('index', {
        title: "This is a title",
        message: "This is a cute message x"
    })
});


// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} x`));