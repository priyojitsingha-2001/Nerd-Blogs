const Blog = require('../models/blog');//requiring the blog model

//display all blogs - Controller
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: "All Blogs", blogs: result });
        })
        .catch(err => {
            console.log(err);
        })
}

//view details of a blog(show full blog) - Controller
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: "Blog Details" });
        })
        .catch(err => {
            console.log(err);
        })
};

// to create a new blog(opens the form to add blog) - Controller
const blog_create_get = (req, res) => {
    res.render('create', { title: "Create Blogs" });
}

// to add a new blog(takes the data and adds it to db) - Controller
const blog_create_post = (req, res) => {
    const formData = req.body;
    const blog = new Blog(formData);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
};

//to delete a blog - Controller
const blog_delete = (req, res) => {
    //gets the id of the blog
    const id = req.params.id;
    //this async method deletes the particular document
    Blog.findByIdAndDelete(id)
        .then(result => {
            //sends the redirect route as json response to the frontend
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}