const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const dbRegister = require('../models/register');

module.exports = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async function (username, password, done) {
        try {
            const user = await dbRegister.findOne({ email: username });
            
            if (!user) {
                return done(null, false);
            }

            let passChk = await bcrypt.compare(password, user.password);
            if (!passChk) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
)