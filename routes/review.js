const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {fishForErrors} = require('../handlers/errorHandlers');
const {isAuthenticated} = require('../handlers/authHandler');


//TODO: Google doc also says we are going to retrieve by {username}

/**
 * Base Review Routes
 */
router.get('/',isAuthenticated, fishForErrors(reviewController.getReviews));
router.get('/:id',isAuthenticated, fishForErrors(reviewController.getReviewById));

/**
 * Protected Routes
 */
router.post('/',isAuthenticated, fishForErrors(reviewController.createReview));
router.put('/:id',isAuthenticated, fishForErrors(reviewController.updateReview));
router.delete('/:id',isAuthenticated, fishForErrors(reviewController.deleteReview));

module.exports = router;