const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('./db')

const path = require('path');
const cookieParser = require('cookie-parser');

//import route files which define the ejs files and data to pass to the browser
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reportRouter = require('./routes/report');
const app = express();

const {getAuth} = require('./controller/utils');

//set the path to the environment variables
dotenv.config({
  path: './.env'
})
// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//------app.use(logger('dev'));
app.use(express.json());

// to not accept form data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//this allows us to use static files like css/images/csv/ etc
//files must live in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//----app.use(morgan('dev'))


//define all the available routes and the router that handle them
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports/', reportRouter);


//set the route and view for our custom 404 page
app.use(function(req, res, next){

  res.status(404).render('404', {
    title: "Page not found",
    auth: getAuth()

  });
});


module.exports = app;
