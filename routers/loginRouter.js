const mongoose = require('mongoose');
const express = require('express');
const alert = require('alert-node');;

const router = express.Router();

// Model
const usersModel = require('../models/usersModel');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const promise = usersModel.find(req.body);
    
    promise.then(data => {
        req.session.user_id = data[0]._id;
        res.redirect('/cvc');
    }).catch(err => {
        alert('Kullanıcı Bilgilerin Yanlış!');
        res.render('login');
    });
});

module.exports = router;
