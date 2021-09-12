const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    writeName: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    tags: [String],
    image: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
