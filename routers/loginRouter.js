const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// Model
const usersModel = require('../models/usersModel');

router.get('/', (req, res) => {
    res.send('LOGIN GET');
});

router.post('/', (req, res) => {
    const promise = usersModel.find(req.body);
    
    promise.then(data => {
        req.session.user_id = data[0]._id;
        res.redirect('/cvc');
    }).catch(err => console.log(err));
});

module.exports = router;