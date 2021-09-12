//dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//internal imports
const homeRoute = require('./routes/homeRoute');
const blogsRoute = require('./routes/blogsRoute');
const writeBlogRoute = require('./routes/writeBlogRoute');

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/', homeRoute);
app.use('/blogs', blogsRoute);
app.use('/writeblog', writeBlogRoute);

//database connection
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database Connected..');
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
