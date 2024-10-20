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
    gitHubId: String,
    username: String,
    email: String,
    profileUrl: String,
    destinationPhotos: [String],
    userPhotos: [String],
    reviews: [String]
}, {
    collection: 'user',
})
userSchema.plugin(findOrCreate);

// Might use this - or not.
// userSchema.pre('save', async function (next) {
//     console.log('Pre Save has been initialized');
// })
//
// userSchema.pre(['updateOne', 'findByIdAndUpdate', 'findOneAndUpdate'], async function (next) {
//     console.log('Pre Update/FindById/FindOne has been initialized');
// })

module.exports = mongoose.models.User || mongoose.model('User', userSchema);