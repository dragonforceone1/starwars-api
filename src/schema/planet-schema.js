const mongoose = require('mongoose')
const DateService = require('../services/date-service')

module.exports.PlanetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    climate: {
        type: String,
        required: true
    },
    ground: {
        type: String,
        required: true
    },
    countFilmAppearances: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: DateService.moment().toDate()
    },
    updatedAt: {
        type: Date,
        default: DateService.moment().toDate()
    },
    deletedAt: {
        type: Date,
        default: null
    }
})
