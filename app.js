require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const {connectDatabase} = require('./handlers/databaseHandler');
const errorHandlers = require('./handlers/errorHandlers');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// //Swagger Header Set up
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

//Setting up the models we will be using in the app
require('./models/Destination');
require('./models/Photo');
const User = require('./models/User');
require('./models/Review');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_URL}`

//TODO: Setup Swagger documentation



app
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: '*',
    }))
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/', require('./routes/index'))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_REDIRECT_URL
}, async (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
        gitHubId: profile.id,
        username: profile.username,
        email: profile.emails[0].value,
        profileUrl: profile.profileUrl,
    }, (err, existingUser) => {
        if (err) return done(err);
        if (existingUser) {
            console.log(`Existing user: ${existingUser}`);
            return done(null, existingUser);
        }
    })
}));


passport.serializeUser((user, done) => {
        console.log('serializing user');
        done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserializing user');
    done(null, user);
});

app.get('/login', passport.authenticate('github', {scope: ['user:email']}));

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/'
}),
    (req, res) => {
    res.redirect('/');
});


    //Errors Middleware
app.use(errorHandlers.notFound)
    .use(errorHandlers.formatErrors)


/**
 * Establish Connection with Database
 */
app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
    await connectDatabase(uri);
});
