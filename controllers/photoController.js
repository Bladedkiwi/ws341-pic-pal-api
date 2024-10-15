// TODO: Send array of Photos to a User - via username?
// TODO: Upload a photo from User - via username?
// TODO: Send/Upload photo to Destination
// TODO: Upload array of photos for a given userID
// TODO: Get photos via username or is it get saved destinations that have their photos for that destination



const Photo = require('../models/Photo');

/**
 * GetPhotos
 *
 * @param req
 * @param res Array of Photos
 * @returns {Promise<void>}
 */
async function getPhotos(req,res){
    const photo = await Photo.find();
    if (photo) {
        res.status(200).send(photo);
    }
}

/**
 * GetPhotoById
 *
 * @param req Photo ID params
 * @param res Photo
 * @returns {Promise<void>}
 */
async function getPhotoById(req,res) {
    const photo = await Photo.findById(req.params.id);
    res.status(200).send(photo);
}

/**
 * CreatePhoto
 *
 * @param req Photo Data
 * @param res Returns created Photo
 * @returns {Promise<void>}
 */
async function createPhoto(req,res) {
    const photo = await Photo.save();
    res.status(200).send(photo);
}

/**
 * UpdatePhoto
 *
 * @param req Photo ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function updatePhoto(req,res) {
    const photo = await Photo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!photo) {
        res.status(404).send('Photo not found');
    }
    res.status(200).send('Photo has been updated.');
}

/**
 * DeletePhoto
 *
 * @param req Photo ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function deletePhoto(req,res) {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    !photo ?
        res.status(404).send('Photo not found')
        :
        res.status(200).send('Photo has been deleted.');
}

module.exports = {
    getPhotos,
    getPhotoById,
    createPhoto,
    updatePhoto,
    deletePhoto};
