const express = require('express');
const router = express.Router();

/**
 * Base Route
 */
router.get('/', function (req, res) {
    res.send('Index.js works.')
});

/**
 * Extended Routes
 */

router.use('/user', require('./user'));
router.use('/photo', require('./photo'));
router.use('/review', require('./review'));
router.use('/destination', require('./destination'));
router.use('/api-docs', require('./swagger'));
router.use('/review', require('./review'));
router.use('/photo', require('./photo'));

/**
 * Login Routes
 */

// router.get('/login', passport.authenticate('github'));
//
//
// router.get('/logout', (req, res, next) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         req.session.destroy((error) => {
//             if (error) return next(error);
//             res.send('You have been logged out.');
//         });
//     });
// });

module.exports = router;

