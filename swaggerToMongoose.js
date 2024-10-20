const m2s = require('mongoose-to-swagger');
const User = require('./models/User');
const Photo = require('./models/Photo');
const Review = require('./models/Review');
const destination = require('./models/Destination');


const schemaDefinitions = {
    user: m2s(User),
    photo: m2s(Photo),
    review: m2s(Review),
    destination: m2s(destination)
}

module.exports = schemaDefinitions;
