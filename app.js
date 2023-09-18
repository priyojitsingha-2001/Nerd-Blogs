const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();

//Connect to mongodb
const dbURI = "mongodb+srv://priyojit:6R1Y4eKOUtSdWAN1@cluster0.dljk7ur.mongodb.net/blogsdb?retryWrites=true&w=majority"
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to db");
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })

//register view engine
app.set('view engine', 'ejs');
// change views folder
// app.set('views', 'ejs_views');

//middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    //temp blog data
    const blogs = [
        { title: "My blog1", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 1" },
        { title: "My blog2", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 2" },
        { title: "My blog3", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 3" }
    ];
    res.render('index', { title: "Home", blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blogs" });
});

//404 page
app.use((req, res) => {// this is a middleware
    res.status(404).render('404', { title: "Error 😵" });
});




