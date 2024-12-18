
const Review = require('../models/Review');

/**
 * GetReviews
 *
 * @param req
 * @param res Array of Reviews
 * @returns {Promise<void>}
 */
async function getReviews(req,res){
    const review = await Review.find().lean();
    if (review) {
        res.status(200).send(review);
    }
}

/**
 * GetReviewById
 *
 * @param req Review ID params
 * @param res Review
 * @returns {Promise<void>}
 */
async function getReviewById(req,res) {
    const review = await Review.findById(req.params.id).lean();
    res.status(200).send(review);
}

/**
 * CreateReview
 *
 * @param req Review Data
 * @param res Returns created Review
 * @returns {Promise<void>}
 */
async function createReview(req,res) {
    const review = new Review(req.body);
    await review.save();
    res.status(200).send(review);
}

/**
 * UpdateReview
 *
 * @param req Review ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function updateReview(req,res) {
    const review = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!review) {
        res.status(404).send('Review not found');
    }
    res.status(200).send('Review has been updated.');
}

/**
 * DeleteReview
 *
 * @param req Review ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function deleteReview(req,res) {
    const review = await Review.findByIdAndDelete(req.params.id);
    !review ?
        res.status(404).send('Review not found')
        :
        res.status(200).send('Review has been deleted.');
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview};



