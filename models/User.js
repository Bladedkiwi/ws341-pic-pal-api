const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');

/**
 * <h1>User Schema</h1>
 * <ul>
 *     <li>firstName</li>
 *     <li>lastName</li>
 *     <li>email</li>
 *     <li>password</li>
 *     <li>destinations</li>
 *     <li>photos</li>
 *     <li>reviews</li>
 *     </ul>
 *
 * <p> Normal User Data with requests to grab from Destinations DB, Photos DB, and Reviews DB</p>
 */

//TODO: Setup mongoose pre.save/update hooks to hash passwords or other protected details of a user.

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxLength: 15
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'], min: [7, 'Must be at least 7 characters'], validate: {
            validator: function (value) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/.test(value);
            },
            message: 'Must include a special character, number, and a capital'
    },
        // TODO: Check that this is the right way to define an array of objects for mongoose
        destinations: String,
        photos: String,
        reviews: String,

    }
}, {
    collection: 'user',
    }
    )

userSchema.pre('save', async function (next) {
    console.log('Pre Save has been initialized');
})

userSchema.pre(['updateOne', 'findByIdAndUpdate', 'findOneAndUpdate'], async function (next) {
    console.log('Pre Update/FindById/FindOne has been initialized');
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);