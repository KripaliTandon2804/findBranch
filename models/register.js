const mongoose = require('mongoose')
const {Schema} = mongoose;
const bcrypt = require('bcrypt')

let register = new Schema({
    userName: String,
    email: String,
    password: String
})

register.pre('save', function(next){
    let user = this;
    if(user.password){
        bcrypt.genSalt(8, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next(err)
            })
        })
    }
})

module.exports = mongoose.model('register', register)