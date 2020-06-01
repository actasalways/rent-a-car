const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarsSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    luggages: {
        type: Number,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
         type: Boolean,
         default: true
    }
}, { collection: 'cars' });

module.exports = mongoose.model('cars', CarsSchema);