
const Destination = require('../models/Destination');

/**
 * GetDestinations
 *
 * @param req
 * @param res Array of destinations
 * @returns {Promise<void>}
 */
async function getDestinations(req,res){
    const destination = await Destination.find().lean();
    if (destination) {
        res.status(200).send(destination);
    }
}

/**
 * GetDestinationById
 *
 * @param req destination ID params
 * @param res destination
 * @returns {Promise<void>}
 */
async function getDestinationById(req,res) {
    const destination = await Destination.findOne(req.params.id).lean();
    res.status(200).send(destination);
}

/**
 * CreateDestination
 *
 * @param req destination Data
 * @param res Returns created destination
 * @returns {Promise<void>}
 */
async function createDestination(req,res) {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(200).send(destination);
}

/**
 * UpdateDestination
 *
 * @param req destination ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function updateDestination(req,res) {
    const destination = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!destination) {
        res.status(404).send('Destination not found');
    }
    res.status(200).send('Destination has been updated.');
}

/**
 * DeleteDestination
 *
 * @param req destination ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
async function deleteDestination(req,res) {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    !destination ?
        res.status(404).send('Destination not found')
        :
        res.status(200).send('Destination has been deleted.');
}

module.exports = {
    getDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination
};
