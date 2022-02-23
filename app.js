
const startupDebugger = require('debug')('app:startup'); // the second is argument
const dbDebugger = require('debug')('app:db'); // if only one used, can use variable name "debug"
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger') // from local module
const express = require('express');
const app = express();

app.use(express.json());

// use middleware from local module
app.use(logger); 
// use built-in middleware
app.use(express.static('public'));
// use third party middleware
app.use(helmet()); // secure HTTP request
// app.use(morgan('tiny')); // log the http request


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


const coursesSavedInCode = [
    { id: 1, name: "cutie1"},
    { id: 2, name: "cutie2"},
    { id: 3, name: "cutie3"},
]

// ============
// Get Requests
// ============
app.get('/', (req, res) => {
    res.send('Yummy Yummy x');
});

app.get('/api/courses', (req, res) => {
    res.send(coursesSavedInCode);
});

app.get('/api/courses/:id', (req, res) => {
    let course = coursesSavedInCode.find(c => c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send("The course was not found")
        return;
    }
    res.send(course);
});


// =============
// Post Requests
// =============
app.post('/api/courses', (req, res) => {
    const { error } = validateCourseAdd(req.body);
    if(error){ 
        res.status(400).send(error); 
        return; 
    }

    // Create a new course and push into course array
    const course = {
        id: coursesSavedInCode.length + 1,
        name: req.body.name // passing of JSON is required
    };
    coursesSavedInCode.push(course);
    res.send(course);
});



// =============
// Put Requests
// =============
app.put('/api/courses/:id', (req, res) => {
    // 1. Check if the resource exist
    let course = coursesSavedInCode.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send("The course was not found") 
        return;
    }
   
    // 2. Input validation
    const { error } = validateCourseUpdate(req.body);
    if(error){ 
        res.status(400).send(error); 
        return; 
    }

    // 3. Update the course
    course.name = req.body.name;
    res.send(course);
});


// =============
// Delete Requests
// ===============
app.delete('/api/courses/:id', (req, res) => {
    // 1. Check if the resource exist
    const course = coursesSavedInCode.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send("The course was not found") 
        return;
    }

    // 2. Delete the resource
    const index = coursesSavedInCode.indexOf(course);
    coursesSavedInCode.splice(index, 1);

    // 3. Return 
    res.send(course);
});



function validateCourseUpdate(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

function validateCourseAdd(course){
    const schema = Joi.object({
        id: Joi.required(),
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} x`));