const jwt = require('jsonwebtoken')
require('dotenv').config()


async function isTokenAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            status: false,
            jsonData: null,
            errorMessage: "No token provided",
            data: null
        })
    }

    jwt.verify(token, process.env.JWT_SECRET,(err, user)=> {
        if(err){
            return res.status(403).json({
                status: false,
                jsonData: null,
                errorMessage: "Invalid token",
                data: null
            });
        }
        req.user = user;
        next();
    });
}


module.exports = isTokenAuthenticated