/**
 * IsAuthenticated
 * -Checks whether a user exits in the current state.
 *
 * @param req http request
 * @param res http response
 * @param next moves on to next middleware
 * @returns {*}
 */
exports.isAuthenticated = (req,res,next) => {
    if (req.user === undefined) {
        return res.status(401).send(`You do not have access.`)
    }
    next();
}