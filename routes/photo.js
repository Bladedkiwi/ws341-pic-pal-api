const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const {fishForErrors} = require('../handlers/errorHandlers');
const {isAuthenticated} = require('../handlers/authHandler');

//TODO: Google doc says we are also doing POST/{username}, GET/{username}, and GET/{destinationName}
//TODO: Google doc also says we are using POST/#id, and DELETE/#id - will that be the same as using the username/destinationName?


/**
 * Base Photo Routes
 */
router.get('/',isAuthenticated, fishForErrors(photoController.getPhotos));
router.get('/:id',isAuthenticated, fishForErrors(photoController.getPhotoById));

/**
 * Protected Routes
 */
router.post('/',isAuthenticated, fishForErrors(photoController.createPhoto));
router.put('/:id',isAuthenticated, fishForErrors(photoController.updatePhoto));
router.delete('/:id',isAuthenticated, fishForErrors(photoController.deletePhoto));

module.exports = router;