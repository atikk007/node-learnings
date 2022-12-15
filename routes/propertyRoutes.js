const express = require('express');
const router = express.Router();
const Property = require('../models/property')
/* Router is an instance of app, it can't do anything alone, it needs to be integrated in an app. Routers are made to make the code more readable and clear the clutter from a single large file */

// Homepage - shows all property.
// we don't need /property here because all /property routes are scoped from app files in middleware. So writing /property here will mean our code will look for /property/property which will give an error, that's why / is enough.

router.get('/', (req, res) => {
    Property.find().sort({ createdAt: 1 })
        .then(result => {
            // res.send(result);
            res.render('index', { title: "All-properties", property: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// to display the form page
// /search = /property/search
router.get('/search', (req, res) => {
    res.render('search', { title: "", property: 0 });
})

// search for a definite property using form.
router.post('/search', (req, res) => {
    const id = req.body.proper;
    console.log(id);
    Property.findById(id)
        .then((result) => {
            console.log(result)
            res.render('searchresult', { title: 'Searched Property is ', property: result });
        }).catch(err => console.log(err));

});

// Property details
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Property.findById(id)
        .then(result => {
            res.render('details', { property: result, title: 'Property Details' });
        })
        .catch(err => {
            console.log(err);
        });
});

// Delete by id 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    // we can't redirect here because we are receiving ajax request from the browser so we have to either send json or some data back to browser, we can't just redirect. Tho, we can send some response from here and then redirect from the browser front-end itself.
    Property.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/property'
            });
        }).catch(err => console.log(err))
})

module.exports = router;