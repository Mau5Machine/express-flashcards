/* 
 ** ABOUT: Import express and middleware into application
 */
const express = require('express');
const router = express.Router();
const {
    data
} = require('../data/flashcardData.json');
const {
    cards
} = data; // equal to saying cards = data.cards

/* 
 ** ABOUT: Route to generate random cards on the /cards route
 */
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}?side=question`);
});

/* 
 ** ABOUT: Route to the cards page
 ** Passing a parameter to the URL with the :id in the get request
 */
router.get('/:id', (req, res) => {
    const {
        side
    } = req.query;
    const {
        id
    } = req.params;

    // ABOUT: If no side in query string, redirect to card question
    if (!side) {
        res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const {
        hint
    } = cards[id];
    const templateData = {
        id,
        text,
        name
    };

    /* 
     ** ABOUT: Setting up the link to switch between answer and question
     */
    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question'
    }
    res.render('card', templateData);
});

/* 
 ** ABOUT: Export this file for use in the app.js file
 */
module.exports = router;