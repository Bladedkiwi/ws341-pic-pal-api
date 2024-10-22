const {fishForErrors} = require("../handlers/errorHandlers");
const destinationController = require("../controllers/destinationController");
const router = require('express').Router();
const {isAuthenticated} = require('../handlers/authHandler')

//TODO: Change GetDestinations by Id to maybe {username} instead? Maybe that's how we use the data from logging a person in with gitHub - Haven't looked into that

/**
 * Base Destination Routes
 */
router.get('/', fishForErrors(destinationController.getDestinations));
router.get('/:id', fishForErrors(destinationController.getDestinationById));

/**
 * Protected Routes
 */
router.post('/',isAuthenticated, fishForErrors(destinationController.createDestination));
router.put('/:id',isAuthenticated, fishForErrors(destinationController.updateDestination));
router.delete('/:id',isAuthenticated, fishForErrors(destinationController.deleteDestination));


module.exports = router;