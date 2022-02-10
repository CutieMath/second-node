const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

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
    if (!course){ res.status(404).send("The course was not found") }
   
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