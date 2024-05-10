const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./middle');

const verifyToken = (roles) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

