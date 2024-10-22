const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

// const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');

/**
 * <h1>User Schema</h1>
 * <ul>
 *     <li>gitHubId</li>
 *     <li>username</li>
 *     <li>email</li>
 *     <li>profileUrl</li>
 *     <li>destinationPhotos</li>
 *     <li>userPhotos</li>
 *     <li>reviews</li>
 *     </ul>
 *
 * <p> Normal User Data with requests to grab from Destinations DB, Photos DB, and Reviews DB</p>
 */


const userSchema = new mongoose.Schema({
    gitHubId: {
        type: Number,
        required: [true, 'GitHub ID is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate:  {
            validator: function (value) {
                return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
            },
            message: 'Please enter a valid email address.'
        }
    },
    profileUrl: {
        type: String,
        required: [true, 'ProfileUrl is required'],
        unique: true,
        validate: {
            validator: function (value) {
                return /(https?:\/\/)?github\.com\/(?<author>[\w-]+)$/.test(value);
            },
            message: 'Please enter a valid GitHub Profile Url.'
        }
    },
    destinationPhotos: [String],
    userPhotos: [String],
    reviews: [String]
}, {
    collection: 'user',
})
userSchema.plugin(findOrCreate);


module.exports = mongoose.models.User || mongoose.model('User', userSchema);