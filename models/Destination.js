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

//TODO: https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose


const destinationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, 'City is required'],
        validate: {
            validator:function (value) {
                return /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(value);
            },
            message: 'Please enter a valid city.'
        }
    },
    country: String,
    photo:[String],
    tourismSpots:[String],
    reviews: [String]
},
    {
        collection: 'destination',
    }
    )

module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);