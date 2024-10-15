const {fishForErrors} = require("../handlers/errorHandlers");
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('User Party')
})

module.exports = router;