const bcrypt = require('bcryptjs');
const helpers = require('../users/usersModel');

function restricted() {
    const authErr = {
        message: 'Invalid Credentials'
    };

    return async (req, res, next) => {
        try {
            const {username, password} = req.headers;
            if (!username || !password) {
                return res.status(401).json(authErr)
            }
            const user = await helpers.findBy({ username }).first();
            if (!user) {
                return res.status(401).json(authErr)
            }
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(401).json(authErr)
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = restricted;
