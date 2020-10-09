const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var decodedToken = jwt.verify(token, "secret");
        req.userTata = {email: decodedToken.email, userId: decodedToken.userId}
        // console.log(req.userTata)
        next();
    } catch (error) {
        res.status(500).json({
            message: 'You are not athenticated!!!'
        })
    }
}
