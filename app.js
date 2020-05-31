const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express();

// MongoDB Connection
const MongoDB = require('./helper/MongoDB')();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 2
  }
}));

app.use('/', require('./routers/indexRouter'));
app.use('/register', require('./routers/registerRouter'));
app.use('/login', require('./routers/loginRouter'));
app.use('/flow', require('./routers/flowRouter'));

app.listen(8000, () => console.log('Server Running..'));