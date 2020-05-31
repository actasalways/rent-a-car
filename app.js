const express = require('express');
const app = express();

// MongoDB Connection
const MongoDB = require('./helper/MongoDB')();

app.use('/', require('./routers/index'));

app.listen(8000, () => console.log('Server Running..'));