const {fishForErrors} = require("../handlers/errorHandlers");
const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send('Destination Space')
})

module.exports = router;