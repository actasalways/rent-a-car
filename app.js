const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// MongoDB Connection
const MongoDB = require('./helper/MongoDB')();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/', require('./routers/index'));
app.use('/register', require('./routers/register'));

app.listen(8000, () => console.log('Server Running..'));