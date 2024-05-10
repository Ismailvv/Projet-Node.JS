const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
};


const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(' ')[1]; 
                const decoded = await jwt.verify(token, 'your_jwt_secret');
                const currentUser = await User.findById(decoded.id);
        

                if (!roles.includes(currentUser.role)) {
                    return res.status(403).send('Access denied');
                }
                next();
            } catch (error) {
                res.status(401).send(error.message || "Invalid token");
            }
    }
};


module.exports = { verifyToken, authorizeRoles };