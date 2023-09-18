const mongoose = require('mongoose');
const Schema = mongoose.Schema;//costructor that defines the structure
//defining the Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Create a Mongoose model named 'Blog' based on the 'blogSchema' schema.
const Blog = mongoose.model('Blogs', blogSchema);
module.exports = Blog;