const { response } = require('express');
const express = require('express');
const Blog = require('../model/blogSchema');

const router = express.Router();

router.get('/', (req, res) => {
    Blog.find().then((response) => {
        res.render('blogs', { getAllBlog: true, data: response });
    });
});
//blog API
router.get('/api', (req, res) => {
    Blog.find().then((response) => {
        res.status(200).json(response);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((response) => {
        res.render('singleBlog', { singleBlog: response });
    });
});

module.exports = router;
