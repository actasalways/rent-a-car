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

module.exports = router;