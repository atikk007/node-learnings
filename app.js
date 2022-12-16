const express = require('express');
const Property = require('./models/property')
//express app
const app = express();

const propertyRoutes = require('./routes/propertyRoutes');
// Connect to MongoDb
require('dotenv').config();
const dbURI = process.env.PORT;

// Setting up Mongoose ODM - 
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

// template view engine
app.set('view engine', 'ejs');

// static file middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));    // this attach all the post data from 'form' name attribute to the request  body as an object.

app.get('/', (req, res) => {
    // res.sendFile('./views/index.ejs', { root: __dirname });
    // res.render('index', { title: "", property: 0 });
    res.redirect('/property');
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about .html', { root: __dirname });
    // because sendFile wants absolute path thats why we are defining the root path and giving dirname to the root so that our app knows which directory to look into to get the path.
})

// mongoose and mongo tests

// Property Routes - 

// this will apply app to all routes in propertyRoutes -
// app.use(propertyRoutes);

// this will apply /property to all routes in propertyRoutes since all routes are concentrated based on their primary routes thats why its generally used.
app.use('/property', propertyRoutes);

// Get add property page -
app.get('/addprop', (req, res) => {
    res.render('addprop');
})

// Post into database using form -
app.post('/addprop', (req, res) => {
    const property = new Property(req.body);
    // console.log(req.body);
    property.save()
        .then((results) => {
            res.redirect('/property');
        }).catch((err) => console.log(err));
})


// Add property with manual input
app.get('/add-property', (req, res) => {
    const property = new Property({
        title: "My third property",
        size: "1BHK",
        body: "this property is okayish."
    });

    property.save()
        .then((result) => { res.redirect('/property') })
        .catch((err) => {
            console.log(err)
        });
})


app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.render('404');
});