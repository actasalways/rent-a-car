const express = require('express');
const alert = require('alert-node');;

const router = express.Router();

// Model
const adminModel = require('../models/adminModel');

router.get('/', (req, res) => {
    res.render('adminLogin');
});

router.post('/', (req, res) => {
    const promise = adminModel.find(req.body);
    
    promise.then(data => {
        req.session.admin_session = data[0]._id;
        res.redirect('/admin');
    }).catch(err => {
        alert('Kullanıcı Bilgilerin Yanlış!');
        res.render('adminLogin');
    });
});

module.exports = router;
