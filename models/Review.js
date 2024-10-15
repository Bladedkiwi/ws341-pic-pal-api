const mongoose = require('mongoose');


/**
 * <h1>Review Schema</h1>
 * <ul>
 *     <li>userId</li>
 *     <li>stars</li>
 *     <li>comments</li>
 * </ul>
 *
 * <p>Reviews are attached to a Destination providing a user's stars and comments they gave that destination.</p>
 */

const reviewSchema = new mongoose.Schema({

//TODO: Figure out whether we need only the userId or only the user's name - or both
    userId: String,
    username: String,
    // TODO: Adjust this to be a required max of 5 stars
    stars: Number,
    comments: String
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);