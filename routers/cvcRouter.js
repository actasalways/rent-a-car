const express = require('express');
const url = require('url')
const alert = require('alert-node');;
const date = new Date();

const router = express.Router();

const carsModel = require('../models/carsModel');
const usersModel = require('../models/usersModel');
const paymentModel = require('../models/paymentModel');

let user_id;

router.get('/', (req, res) => {    
    user_id = req.session.user_id;
    
    promise = url.parse(req.url, true).search == null
        ? carsModel.find({
            available: true
        })
        : carsModel.find({
            available: true,
            passengers: url.parse(req.url, true)
                           .query
                           .passengers,
            liter: {
                $gte: url.parse(req.url, true)
                         .query
                         .min_liter,
                $lte: url.parse(req.url, true)
                         .query
                         .max_liter
            },
            doors: url.parse(req.url, true)
                      .query
                      .doors,
            price: {
                $gte: url.parse(req.url, true)
                         .query
                         .min_price,
                $lte: url.parse(req.url, true)
                         .query
                         .max_price
            }
        });
    
    promise.then(data => {
        res.render('rent', {
            session: user_id,
            cars: data
        });
    }).catch(err => console.log(err));
});

router.get('/profile', (req, res) => {
    const promise = usersModel.findById(user_id);

    promise.then(data => {
        res.render('profile', { data });
    });
});

router.post('/profile', (req, res) => {
    const promise = usersModel.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true }
    );

    promise.then(data => res.render('profile', { data }));
    
});

router.get('/password', (req, res) => {
    res.render('password', { user_id });
});

router.post('/password', (req, res) => {
    const {
        password, 
        new_password, 
        repeat
    } = req.body;

    const equal = new_password === repeat

    const promise = usersModel.findById(user_id);

    promise.then(data => {
        if(data.password === password && equal){
            const updatePromise = usersModel.findByIdAndUpdate(
                user_id,
                {
                    password: new_password
                },
                { new: true }
            );
            updatePromise.then(() => {
                alert('Şifre Güncellendi');
                res.render('password');
            })
        } else{
            alert('Tekrar Giriniz');
            res.render('password');
        }
    }).catch(err => res.json(err));
});

router.get('/rented', (req, res) => {
    const promise = paymentModel.find({user_id});

    promise.then(data => {
        console.log(data);
        res.render('rented', { rented: data });
    }).catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const promise = carsModel.findById(req.params.id);

    promise.then(data => {
        res.render('payment', {
            car: data,
            session: user_id,
            date: {
                day: date.getDate() < 10 
                    ? `0${date.getDate()}` 
                    : date.getDate(),
                month: date.getMonth() + 1 < 10 
                    ? `0${date.getMonth() + 1}` 
                    : date.getMonth() + 1,
                year: date.getFullYear(),
                oneMoreDay: date.getDate() < 10
                    ? `0${date.getDate() + 1}` 
                    : date.getDate() + 1,
            }
        })
    }).catch(err => console.log(err));
});

router.post('/:id', (req, res) => {
    
    const payment = new paymentModel({
        user_id: user_id,
        car_id: req.params.id,
        starting_date: req.body.starting_date,
        due_date: req.body.due_date
    });

    const promise = payment.save();

    promise.then(data => {
        const availablePromise = carsModel.findByIdAndUpdate(
            req.params.id,
            { available: false }
        );
        
        availablePromise.then(res.redirect('/cvc/rented'))
                        .catch(err => console.log(err));
    }).catch(err => res.json(err))
});

module.exports = router;