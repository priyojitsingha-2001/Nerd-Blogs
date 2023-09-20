const express = require('express');
const blogController = require('../controller/blogController'); //requiring blog controller
const router = express.Router();

/*Blog routes*/

// to display all blogs
router.get('/blogs', blogController.blog_index);

// to create a new blog(opens the form to add blog)
router.get('/blogs/create', blogController.blog_create_get);

// to view details of a blog(show full blog)
router.get('/blogs/:id', blogController.blog_details);

// to add a new blog(takes the data and adds it to db)
router.post('/blogs', blogController.blog_create_post);

//to delete a blog
router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;