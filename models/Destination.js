const mongoose = require('mongoose');

/**
 * <h1>Destination Schema</h1>
 * <ul>
 *     <li>city</li>
 *     <li>country</li>
 *     <li>photo</li>
 *     <li>tourismSpots</li>
 *     <li>reviews</li>
 * </ul>
 *
 * <p>Destination provides details about a city including a photo, description, tourism spots, and any reviews users have given the city.</p>
 *
 */

const destinationSchema = new mongoose.Schema({
    //TODO: Same thing with city - if that's possible. Maybe throw in a custom function that calls an outside api to check. An idea at least
    city: String,
    // TODO: Set any restrictions needed to make sure this is a country
    country: String,
    //TODO: Check that this is right
    photo:[String],
    tourismSpots:[String],
    reviews: [String]
},
    {
        collection: 'destination',
    }
    )

module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);