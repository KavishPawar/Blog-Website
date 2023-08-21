const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema defines the structure of the document

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
    }
}, {timestamps: true})

// we first create the Schema and then create a model as given below with a name (*imp) 

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;