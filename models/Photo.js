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
    imgUrl: String,
    // TODO: Set a max string character amount
    imgAlt:String,
    description: String
})