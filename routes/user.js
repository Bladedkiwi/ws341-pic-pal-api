const {fishForErrors} = require("../handlers/errorHandlers");
const router = require('express').Router();
const userController = require("../controllers/userController");
const {isAuthenticated} = require('../handlers/authHandler');

//TODO: Add in POST user by ID upload Image, Destination, Reviews Routes

/**
 * Base User Routes
 */
router.get('/', fishForErrors(userController.getUsers));
router.get('/:id', isAuthenticated, fishForErrors(userController.getUserById));

/**
 * Protected Routes
 */
router.post('/', fishForErrors(userController.createUser));
router.put('/:id', isAuthenticated, fishForErrors(userController.updateUser));
router.delete('/:id',isAuthenticated,  fishForErrors(userController.deleteUser));

module.exports = router;