const express = require('express');
const helpers = require('./usersModel');
const restricted = require('../middleware/restricted');

const router = express.Router();

router.get('/', restricted(), async (req, res, next) => {
    try {
        res.json(await helpers.find())
    } catch (e) {
        next(e)
    }
});

module.exports = router;
