const mongoose = require('mongoose')
const {Schema} = mongoose;

let branch = new Schema({
    branchId: String,
    branchName: String,
    income: String,
    city: String,
    branchAddress: String,
    branchLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates:{
            type: [Number],
        }
    }
})
branch.index({ 'branchLocation.coordinates': '2dsphere' })
module.exports = mongoose.model('branch', branch)