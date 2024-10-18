const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * Base Route
 */
router.get('/', function (req, res) {
    res.send(req.user ? `Logged in as ${req.user.username}` : `You are not logged in.`);
})

/**
 * Extended Routes
 */

router.use('/user', require('./user'));
router.use('/destination', require('./destination'));
router.use('/api-docs', require('./swagger'));
router.use('/review', require('./review'));
router.use('/photo', require('./photo'));

/**
 * Login Routes
 */

router.get('/login', passport.authenticate('github'));


router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((error) => {
            if (error) return next(error);
            res.redirect('/');
        });
    });
});

module.exports = router;

