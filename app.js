const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const path = require('path');

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

// Session Access Control
const {
  sess_in,
  sess_out
} = require('./helper/sess-config');

// Pug 
app.set('view engine', 'pug')
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/admin', require('./routers/adminRouter'))

app.use('/register', /*sess_out,*/ require('./routers/registerRouter'));
app.use('/login', /*sess_out,*/ require('./routers/loginRouter'));
app.use('/cvc', /*sess_in,*/ require('./routers/cvcRouter'));
app.use('/', /*sess_out,*/ require('./routers/indexRouter'));

app.listen(8000, () => console.log('Server Running..'));