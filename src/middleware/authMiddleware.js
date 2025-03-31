const jwt = require('jsonwebtoken');
const { checkAuthUser } = require('../services/userService');

const protectAdmin = async (req, res, next) => {
    try {
        const user = await checkAuthUser(req);
        
        if (!user || user.profilePermission !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = protectAdmin;
