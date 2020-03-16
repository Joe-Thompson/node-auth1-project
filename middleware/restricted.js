function restricted() {
    const authErr = {
        message: 'Invalid Credentials'
    };

    return async (req, res, next) => {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json(authErr);
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = restricted;
