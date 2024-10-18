const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {fishForErrors} = require('../handlers/errorHandlers');

//TODO: Google doc also says we are going to retrieve by {username}

/**
 * Base Review Routes
 */
router.get('/', fishForErrors(reviewController.getReviews));
router.get('/:id', fishForErrors(reviewController.getReviewById));

/**
 * Protected Routes
 */
router.post('/', fishForErrors(reviewController.createReview));
router.put('/:id', fishForErrors(reviewController.updateReview));
router.delete('/:id', fishForErrors(reviewController.deleteReview));

module.exports = router;