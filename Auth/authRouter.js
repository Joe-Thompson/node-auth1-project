const express = require('express');
const bcrypt = require('bcryptjs');
const helpers = require('../users/usersModel');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {

        const { username } = req.body;
        const user = await helpers.findBy({ username }).first();

        if (user) {
            return res.status(409).json({
                message: 'Username is already taken'
            })
        }

        res.status(201).json(await helpers.add(req.body));

    } catch (e) {
        next(e)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await helpers.findBy({ username } ).first();
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!user || !passwordValid) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            })
        }

        res.status(200).json({
            message: `Welcome ${user.username}`
        })
    } catch (e) {
        next(e)
    }
});


module.exports = router;
