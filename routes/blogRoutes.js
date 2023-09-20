const express = require('express');
const Blog = require('../models/blog');//requiring the blog model
const router = express.Router();

//blog routes
router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: "All Blogs", blogs: result });
        })
        .catch(err => {
            console.log(err);
        })
})

// to add data for the new blog
router.post('/blogs', (req, res) => {
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

//to create a new blog
router.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blogs" });
});

//view a blog
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: "Blog Details" });
        })
        .catch(err => {
            console.log(err);
        })
})

//delete a blog
router.delete('/blogs/:id', (req, res) => {
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
})

module.exports = router;