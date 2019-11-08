const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

module.exports = app;

// settings
app.set('port', 4000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
// routes
app.use( require('./routes/index'));

// statics files
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler

app.use((req, res, next) => {
    res.status(404).send('404 not found');
});





