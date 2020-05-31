const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    user_id = req.session.user_id

    res.render('cvc');
});

module.exports = router;