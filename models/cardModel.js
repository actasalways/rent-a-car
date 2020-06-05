const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    card_number: {
        type: String,
        required: false
    },
    expiration_month: {
        type: String,
        required: false
    },
    expiration_year: {
        type: String,
        required: false
    },
    cvv: {
        type: String,
        required: false
    }
}, { collection: 'card' });

module.exports = mongoose.model('card', cardSchema);