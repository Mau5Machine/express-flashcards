/* 
 ** ABOUT: Import express and middleware into application
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* 
 ** ABOUT: Initiate express application
 */
const app = express();

/* 
 ** ABOUT: app.use is for middleware
 ** We are using bodyParser and cookieParser
 */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

/* 
 ** ABOUT: Set the view engine to handle pug templates
 */
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
/* 
 ** ABOUT: 404 Error handling if route is not found
 */
app.use((req, res, next) => {
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
});

/* 
 ** ABOUT: Using the error middleware to pass error message
 */
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

/* 
 ** ABOUT: Open server to listen on port :8080
 */
app.listen(8080, () => {
    console.log('The application is running on localhost:8080');
});