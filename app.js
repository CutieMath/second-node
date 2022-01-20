const express = require('express');
const app = express();

const coursesSavedInCode = [
    { id: 1, name: "cutie1"},
    { id: 2, name: "cutie2"},
    { id: 3, name: "cutie3"},
]

app.get('/', (req, res) => {
    res.send('Baby Yummy Whoo hooo x');
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

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} x`));