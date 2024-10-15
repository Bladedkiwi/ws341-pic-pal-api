require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const {connectDatabase} = require('./handlers/databaseHandler');
const errorHandlers = require('./handlers/errorHandlers');
const cors = require('cors');

//Setting up the models we will be using in the app
require('./models/Destination');
require('./models/Photo');
require('./models/User');
require('./models/Review');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_URL}`

//TODO: Create DB credentials
//TODO: Setup User Login session stuff
//TODO: Get the app to simply start and load
//TODO: Setup Swagger documentation



app
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: '*',
    }))
    .use('/', require('./routes/index'))
    //Errors Middleware
    .use(errorHandlers.notFound)
    .use(errorHandlers.formatErrors)


/**
 * Establish Connection with Database
 */
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
    await connectDatabase(uri);
});
