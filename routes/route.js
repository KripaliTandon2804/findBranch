const express = require('express')
const router = express.Router();
const passport = require('passport')
const tokenVerify = require('../auth/tokenVerify')

passport.use(require('../auth/passport'));
passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (user, done) { done(null, user); });

const register = require('./register')
router.post('/register', register)

const login = require('./login')
router.post('/login', login)

const addBranch = require('./addBranch')
router.post('/branch', tokenVerify, addBranch)

const nearestBranch = require('./nearestBranch')
router.put('/findBranch/:distance', tokenVerify, nearestBranch)

const maxIncome = require('./maxIncome')
router.get('/findByMaxIncome', tokenVerify, maxIncome)

module.exports = router;