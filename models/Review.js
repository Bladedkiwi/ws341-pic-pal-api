const mongoose = require('mongoose');

/**
 * <h1>Review Schema</h1>
 * <ul>
 *     <li>username</li>
 *     <li>stars</li>
 *     <li>comments</li>
 * </ul>
 *
 * <p>Reviews are attached to a Destination providing a user's stars and comments they gave that destination.</p>
 */

const reviewSchema = new mongoose.Schema({
    username: String,
    stars: {
        type: Number,
        maxLength: 5
    },
    comments: String
},
    {
        collection: 'review',
    }
);

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);