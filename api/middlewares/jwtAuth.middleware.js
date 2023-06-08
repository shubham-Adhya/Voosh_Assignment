const jwt = require('jsonwebtoken')
require('dotenv').config();

async function jwtAuth(req, res, next) {
    const token = req.cookies?.token;
    if (token) {
        // console.log(token)
        jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
            if (err) throw err;
            req.userData = decoded
        })
        next()
    } else {
        res.status(401).json("Please Provide Token")
    }
}
module.exports = {
    jwtAuth
}