const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
module.exports = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token']
        if (token) {
            let decoded = jwt.verify(token, process.env.SECRET)
            if(!decoded){
                return res.status(401).json({message: "Unauthorized Request"})
            }else{
                req.decoded = decoded;
                next()
            }                    
        } else {
            return res.status(401).json({message: "Unauthorized Request"})
        }
    } catch (err) {
        next(err)
    }

}