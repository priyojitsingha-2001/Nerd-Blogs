const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
// change views folder
// app.set('views', 'ejs_views');

//middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    //temp blog data
    const blogs = [
        // { title: "My blog1", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 1" },
        // { title: "My blog2", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 2" },
        // { title: "My blog3", snippet: "The Quick Brown Fox jumps over the lazy Dog, blog 3" }
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

//listenig to app
app.listen(3000);


