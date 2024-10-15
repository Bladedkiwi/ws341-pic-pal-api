const {fishForErrors} = require("../handlers/errorHandlers");
const destinationController = require("../controllers/destinationController");
const router = require('express').Router();

//TODO: Change GetDestinations by Id to maybe {username} instead? Maybe that's how we use the data from logging a person in with gitHub - Haven't looked into that

/**
 * Base Destination Routes
 */
router.get('/', fishForErrors(destinationController.getDestinations));
router.get('/:id', fishForErrors(destinationController.getDestinationById));

/**
 * Protected Routes
 */
router.post('/', fishForErrors(destinationController.createDestination));
router.put('/:id', fishForErrors(destinationController.updateDestination));
router.delete('/:id', fishForErrors(destinationController.deleteDestination));


module.exports = router;