/**
 * Development Debug Routes
 */

// const swaggerUi = require("swagger-ui-express");
// // const swaggerDocument = require("../swagger.json");
const router = require("express").Router();
//
// router.use('/', swaggerUi.serve);
// // router.get('/', swaggerUi.setup(swaggerDocument));
//

router.get("/", async (req, res) => {
    res.send('Api-docs in progress');
})

module.exports = router;