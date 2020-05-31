const mongoose = require('mongoose');

const { DB_HOST, DB_NAME } = require('./config');

module.exports = () =>

    mongoose.connect(
        `mongodb+srv://${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true
         }
    );

    mongoose.connection.on('open', () => console.log('MongoDB: Connected'));
    mongoose.connection.on('err', err => console.log('MongoDB: Error', err));

