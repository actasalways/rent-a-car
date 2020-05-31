const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('ANA SAYFA')
});

module.exports = router;