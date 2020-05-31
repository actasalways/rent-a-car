const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// Model
const usersModel = require('../models/usersModel');
const cardModel = require('../models/cardModel');

router.get('/', (req, res) => {
    res.send('REGISTER GET')
});

router.post('/', (req, res) => {
    const user = new usersModel(req.body);
    const promise = user.save();

    promise.then(data => {
        const card = new cardModel({
            'user_id': data._id,
            'card_number': '',
            'expiration_month': '',
            'expiration_year': '',
            'cvv': ''
        });
        const promise = card.save();

        promise.then(() => res.redirect('/login'))
               .catch(err => res.json(err));
    }).catch(err => res.json(err));
});

module.exports = router;
