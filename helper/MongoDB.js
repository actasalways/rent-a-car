const mongoose = require('mongoose');

const { DB_HOST, DB_NAME } = require('./mongo-config');

module.exports = () =>

    mongoose.connect(
        `mongodb+srv://${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
         }
    );

    mongoose.connection
        .on('open', () => console.log('MongoDB: Connected'))
        .on('err', err => console.log('MongoDB: Error', err));

