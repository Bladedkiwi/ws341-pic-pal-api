
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
    //After noticing a way to get rid of the extra data from a mongoose model, then found a way to simply do it with mongoose using lean(). This returns plain JS Objects not the full Mongoose Documents
    const user = await User.find().lean();

    //Noticed while doing the Get User Jest Request that the whole mongoose object data with extra details and methods was being sent back in the response. Wasn't able to get a successful test because of that. So I adjusted the retrieval process to filter that out.

    // const plainUser = user.map(user => user.toObject())

    res.status(200).send(user);
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
    const user = await User.findById(req.params.id).lean();
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



