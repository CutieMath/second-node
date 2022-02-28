const express = require('express');
const router = express.Router()

const coursesSavedInCode = [
    { id: 1, name: "cutie1"},
    { id: 2, name: "cutie2"},
    { id: 3, name: "cutie3"},
]

router.get('/', (req, res) => {
    res.send(coursesSavedInCode);
});

router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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


module.exports = router;