const express = require('express');
const router = express.Router();

// Model
const carsModel = require('../models/carsModel');
const priceModel = require('../models/priceModel');

router.get('/', (req, res) => {
    res.send('ADMIN')
});

router.get('/car', (req, res) => {
    res.send('/car');
});

router.post('/car', (req, res) => {
    const car = new carsModel(req.body);
    const promise = car.save();

    promise.then(data => {
        const price = new priceModel(
            
        )
        res.json(data);
    }).catch(err => res.json(err));
});

router.put('/car/:id', (req, res) => {
    const promise = carsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    promise.then(data => res.json(data))
           .catch(err => res.json(err));
});

router.delete('/car/:id', (req, res) => {
    const promise = carsModel.findByIdAndRemove(req.params.id);

    promise.then(data => res.json(data))
           .catch(err => res.json(err));
})

module.exports = router;