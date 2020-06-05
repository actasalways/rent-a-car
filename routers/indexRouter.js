const express = require('express');

const router = express.Router();

// import models
const carsModel = require('../models/carsModel');

router.get('/', (req, res) => {
    
    const promise = carsModel.find({
        available: true
    });

    promise.then(data => {
        console.log(data);
            res.render('index', { cars: data })
        }).catch(err => console.log(err));

    
});

router.post('/', (req, res) => {

    res.send('POST')
});

module.exports = router;