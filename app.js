const express = require('express');
const app = express();

app.use('/', require('./routers/index'));

app.listen(8000, () => console.log('Server Running..'));