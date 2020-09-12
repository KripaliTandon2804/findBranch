const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const port = process.env.port || 3000

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

const mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI,mongoOptions);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const routes = require('./routes/route')

app.use('/api', routes)

app.use((err, req, res, next) => {
    res.status(500).send(err);
});

app.listen(port, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started listening at port ${port}`)
    }
})