require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const {connectDatabase} = require('./handlers/databaseHandler');
const errorHandlers = require('./handlers/errorHandlers');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;


//Setting up the models we will be using in the app
require('./models/Destination');
require('./models/Photo');
require('./models/User');
require('./models/Review');
const {fishForErrors} = require("./handlers/errorHandlers");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_URL}`

//TODO: Create DB credentials
//TODO: Setup User Login session stuff
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
},
    async (accessToken, refreshToken, profile, done) => {{
        console.log(`User exists: ${profile.username}`);
        return done(null, profile);
    }
}));

passport.serializeUser((user, done) => {
        console.log('serializing user');
        done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserializing user');
    done(null, user);
});

app.get('/login', passport.authenticate('github'));

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
