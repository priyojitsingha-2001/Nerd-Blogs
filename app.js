const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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
// change views folder  app.set('views', 'ejs_views');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded());// Middleware to parse URL-encoded data


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});


//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: "All Blogs", blogs: result });
        })
        .catch(err => {
            console.log(err);
        })
})

// Route handler to handle a form submission
app.post('/blogs', (req, res) => {
    const formData = req.body;
    const blog = new Blog(formData);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blogs" });
});

//404 page
app.use((req, res) => {// this is a middleware
    res.status(404).render('404', { title: "Error 😵" });
});




