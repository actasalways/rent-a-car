const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// Model
const usersModel = require('../models/usersModel');
const cardModel = require('../models/cardModel');

router.get('/', (req, res) => {
    res.render('register')
});

router.post('/', (req, res) => {
    const user = new usersModel(req.body);
    const promise = user.save();

    promise.then(data => {
        promise.then(() => res.redirect('/login'))
               .catch(err => res.json(err));
    }).catch(err => res.json(err));
});

module.exports = router;
