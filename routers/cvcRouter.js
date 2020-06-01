const express = require('express');
const router = express.Router();

const carsModel = require('../models/carsModel');

router.get('/', (req, res) => {
    user_id = req.session.user_id

    res.render('cvc');
});

router.get('/rent', (req, res) => {
    const promise = carsModel.find({});
    
    promise.then(data => {
        res.render('rent', {
            cars: data
        });
    }).catch(err => console.log(err));

    
});

router.get('/rent/:id', (req, res) => {
    res.send('HREF');
});

router.post('/rent/:id', (req, res) => {
    res.send('POST');
});

router.get('/password', (req, res) => {
    res.send('PASSWORD GET');
});

router.put('/password', (req, res) => {
    res.send('PASSWORD PUT');
});

router.get('/card', (req, res) => {
    res.send('CARD GET');
});

router.put('/card', (req, res) => {
    res.send('CARD PUT');
});

router.get('/rented', (req, res) => {
    res.send('RENTED GET');
});

module.exports = router;