const mongoose = require('mongoose');


/**
 * <h1>Photo Schema</h1>
 * <ul>
 *     <li>title</li>
 *     <li>imgUrl</li>
 *     <li>imgAlt</li>
 *     <li>description</li>
 * </ul>
 *
 * <p>Photos provide the title, image url in x64bit encoding, the alt attribute text, and a brief description of the photo.</p>
 */

const photoSchema = new mongoose.Schema({
    title: String,
    imgUrl: {
        type: String,
        required: true,
        validator: function (value) {
            return /(https?:\/\/.*\.(?:png|jpg))/i.test(value);
        }
    },
    imgAlt:{
        type: String,
        maxLength: [100, 'Max of 200 characters'],
    },
    description: {
        type: String,
        maxLength:[ 400, 'Max of 400 characters']
    },
},
    {
        collection: 'photo',
    }

    )

module.exports = mongoose.models.Photo || mongoose.model('Photo', photoSchema);