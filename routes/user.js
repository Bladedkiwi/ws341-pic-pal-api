const {fishForErrors} = require("../handlers/errorHandlers");
const router = require('express').Router();
const userController = require("../controllers/userController");

//TODO: Add in POST user by ID upload Image, Destination, Reviews Routes

/**
 * Base User Routes
 */
router.get('/', fishForErrors(userController.getUsers));
router.get('/:id', fishForErrors(userController.getUserById));

/**
 * Protected Routes
 */
router.post('/', fishForErrors(userController.createUser));
router.put('/:id', fishForErrors(userController.updateUser));
router.delete('/:id', fishForErrors(userController.deleteUser));

module.exports = router;