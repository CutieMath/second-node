const express = require('express');
const router = express.Router()


// ============
// Get Requests
// ============
router.get('/', (req, res) => {
    // res.send('Yummy Yummy x');
    res.render('index', {
        title: "This is a title",
        message: "This is a cute message x"
    })
});


module.exports = router;