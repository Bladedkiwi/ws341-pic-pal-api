/**
 * FishForErrors
 *
 * Takes any function passed through and behaves like a try/catch.
 * @param givenFunction Ones passed through like those from the controllers
 * @returns {function(*, *, *): Promise<any>} Naturally, It only works with functions including a callback or async
 */
exports.fishForErrors = (givenFunction) => {
    return function(req, res, next)
    {
        return givenFunction(req, res, next).catch(next);
    };
}

/**
 *
 * Simply handles any 404 errors
 *
 * @param req
 * @param res
 * @param next
 */
exports.notFound = (req, res, next) => {
    const errNothing = new Error('Sorry, this page has escaped existence.');
    errNothing.status = 404;
    next(errNothing);
}

/**
 * Formatting any errors thrown so that they are a little easier to read.
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.formatErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status || 500,
        stack: err.stack
    };
    res.status(err.status || 500).send(errorDetails);
}