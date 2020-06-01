const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    
}, { collection: 'price' });

module.exports = mongoose.model('price', PriceSchema);