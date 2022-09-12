const jwt = require("jsonwebtoken");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const config = process.env;

const verifyToken = (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers["x-access-token"] ;

    if (!token) {

        bearerHeader = req.headers['authorization']
        if(typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            token = bearer[1];
        }
    }

    if (!token) {
        token = localStorage.getItem('currentToken')
    }

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("You must login to access this page");
    }
    return next();
};


module.exports = verifyToken;