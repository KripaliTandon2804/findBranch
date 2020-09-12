const jwt = require('jsonwebtoken')
const passport = require('passport')
const fs = require('fs')
const path = require('path')
const loginUser = async (req, res, next) => {
    try {
        let payload = { email: req.user.email, userName: req.user.userName };
        let token = jwt.sign(payload, process.env.SECRET);
        
        return res.status(200).json({
            "success": true,
             "status": 200,
            "message": "Authenticated",
            "token": token,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ 
                "success": false,
                "status": 401,
                "message": "Authentication Failed" });
        }
       
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return loginUser(req, res, next);
        });
    })(req, res, next);
    
}


