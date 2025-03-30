const jwt = require('jsonwebtoken');
const { checkAuthUser } = require('../services/userService');

const protect = async (req, res, next) => {
    try {
        const user = await checkAuthUser(req);
        
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = protect;
