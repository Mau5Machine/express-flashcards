/* 
 ** ABOUT: Import express and middleware into application
 */
const express = require('express');
const router = express.Router();

/* 
 ** ABOUT: Route to the home page
 */
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {
            name
        });
    } else {
        res.redirect('/hello');
    }

});

/* 
 ** ABOUT: Route to the hello form only when the cookie is not set,
 ** ask for name.
 */
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

/* 
 ** ABOUT: Route to setup the cookie through the hello page
 */
router.post('/hello', (req, res) => {
    // Sending a cookie with the post request
    res.cookie('username', req.body.username);
    res.redirect('/');
});

/* 
 ** ABOUT: Route to the goodbye page to clear the cookie
 */
router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

/* 
 ** ABOUT: Export this file for use in the app.js file
 */
module.exports = router;