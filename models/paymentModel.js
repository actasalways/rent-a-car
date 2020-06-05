const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    car_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    starting_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
}, { collection: 'payments' });

module.exports = mongoose.model('payments', PaymentSchema);