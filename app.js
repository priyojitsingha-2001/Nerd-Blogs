const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config()
//express app
const app = express();

//Connect to mongodb
const dbURI = `mongodb+srv://priyojit:${process.env.admin_password}@cluster0.dljk7ur.mongodb.net/blogsdb?retryWrites=true&w=majority`
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to db");
        //listenig to server, after connection established
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })

//register view engine
app.set('view engine', 'ejs');
// to change views folder - app.set('views', 'ejs_views');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded());// Middleware to parse URL-encoded data

// Home page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//anout page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

//blog routes
app.use(blogRoutes);

//404 page
app.use((req, res) => {// this is a middleware
    res.status(404).render('404', { title: "Error 😵" });
});