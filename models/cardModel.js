const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    card_number: {
        type: Number,
        required: false
    },
    expiration_month: {
        type: Number,
        required: false
    },
    expiration_year: {
        type: Number,
        required: false
    },
    cvv: {
        type: Number,
        required: false
    }
}, { collection: 'card' });

module.exports = mongoose.model('card', cardSchema);