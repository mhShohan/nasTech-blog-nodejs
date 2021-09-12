const express = require('express');
const multer = require('multer');
const Blog = require('../model/blogSchema');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('writeblog');
});

//file upload system
const UPLOAD_FOLDER = `${__dirname}/../public/uploads`;
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, UPLOAD_FOLDER);
    },
    filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        let filename =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now();

        callback(null, filename + fileExt);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            callback(null, true);
        } else {
            callback(new Error('Only Image file allowed..'));
        }
    },
});

router.post('/', upload.single('image'), (req, res) => {
    const { writeName, title, tags, description } = req.body;
    const image = req.file.filename;

    let tagsArr = tags.split(', ');
    console.log(tagsArr);
    const imgStr = `/uploads/${image}`;

    const newBlog = new Blog({
        writeName,
        title,
        tags: tagsArr,
        image: imgStr,
        description,
    });

    newBlog
        .save()
        .then((response) => {
            console.log('New Blog Written');
            const id = response._id;

            res.redirect(`/blogs/${id}`);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
