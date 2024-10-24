// TODO: Upload array of saved destinations
// TODO: Upload new reviewID to array of reviews for User Object
// TODO: Upload Photo to User and store photoID into array
// TODO:


const User = require('../models/User');

/**
 * GetUsers
 *
 * @param req
 * @param res Array of Users
 * @returns {Promise<void>}
 */
//#swagger.tags=['user']
async function getUsers(req,res){
    const user = await User.find();
    if (user) {
        res.status(200).send(user);
    }
}

/**
 * GetUserById
 *
 * @param req User ID params
 * @param res User
 * @returns {Promise<void>}
 */
//#swagger.tags=['user']
async function getUserById(req,res) {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
}

/**
 * CreateUser
 *
 * @param req User Data
 * @param res Returns created User
 * @returns {Promise<void>}
 */
//#swagger.tags=['user']
async function createUser(req,res) {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
}

/**
 * UpdateUser
 *
 * @param req User ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
//#swagger.tags=['user']
async function updateUser(req,res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!user) {
        res.status(404).send('User not found');
    }
    res.status(200).send('User has been updated.');
}

/**
 * DeleteUser
 *
 * @param req User ID params
 * @param res Displays message upon success/failure
 * @returns {Promise<void>}
 */
//#swagger.tags=['user']
async function deleteUser(req,res) {
    const user = await User.findByIdAndDelete(req.params.id);
    !user ?
        res.status(404).send('User not found')
        :
        res.status(200).send('User has been deleted.');
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser};



