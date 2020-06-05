const express = require('express');
const alert = require('alert-node');
const url = require('url');

const router = express.Router();

const currentTime = new Date();

// Model
const carsModel = require('../models/carsModel');
const usersModel = require('../models/usersModel');
const paymentModel = require('../models/paymentModel');
const adminModel = require('../models/adminModel');

let admin_session;

router.get('/', (req, res) => {

    admin_session = req.session.admin_session;

    promise = url.parse(req.url, true).search == null
        ? paymentModel.find({
            due_date: { 
                $gte: currentTime 
            }
        })
        : paymentModel.find({
            _id: url.parse(req.url, true)
                    .query
                    .search,
            due_date: { 
                $gte: currentTime 
            }
        });


    promise.then(data => res.render('paymentAdmin', { payments: data }))
});

router.post('/', (req, res) => {
    
    
})

// Car Start Here
router.get('/car', (req, res) => {

    promise = url.parse(req.url, true).search == null
        ? carsModel.find({})
        : carsModel.find({
            _id: url.parse(req.url, true)
                    .query
                    .search
        });

    promise.then(data => res.render('car', { cars: data}))
           .catch(err => console.log(err));

});

router.get('/car/add', (req, res) => {
    res.render('carAdd');
});

router.post('/car/add', (req, res) => {
    const car = new carsModel(req.body);
    const promise = car.save();

    promise.then(data => {
        res.redirect('/admin/car');
    }).catch(err => res.json(err));
});

router.get('/car/delete/:id', (req, res) => {
    const promise = carsModel.findByIdAndRemove(req.params.id);

    promise.then(() => res.redirect('/admin/car'))
           .catch(err => res.json(err));
});

router.get('/car/:id', (req, res) => {
    const promise = carsModel.findById(req.params.id);

    promise.then(data => {
        res.render('carUpdate', {car: data})
    }).catch(err => console.log(err));
    
});

router.post('/car/:id', (req, res) => {
    const promise = carsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    promise.then(data => {
        res.redirect('/admin/car')
    }).catch(err => res.json(err));
});

router.delete('/car/:id', (req, res) => {
    const promise = carsModel.findByIdAndRemove(req.params.id);

    promise.then(data => res.json(data))
           .catch(err => res.json(err));
});
// Car Ends Here

// Users Starts Here
router.get('/profile', (req, res) => {

    promise = url.parse(req.url, true).search == null
        ? usersModel.find({})
        : usersModel.find({
            _id: url.parse(req.url, true)
                    .query
                    .search
        });

    promise.then(data => res.render('profiles', { profiles: data }))
           .catch(err => res.json(err));
});

router.get('/profile/delete/:id', (req, res) => {
    const promise = usersModel.findByIdAndRemove(req.params.id);

    promise.then(() => res.redirect('/admin/profile'))
           .catch(err => res.json(err));
});

router.get('/profile/:id', (req, res) => {
    const promise = usersModel.findById(req.params.id);

    promise.then(data => res.render('profilesUpdate', { profile: data }))
           .catch(err => console.log(err));
});

router.post('/profile/:id', (req, res) => {
    const promise = usersModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    promise.then(() => res.redirect('/admin/profile'))
           .catch(err => res.json(err));
});
// Users Ends Here

// Payments Starts Here
router.get('/delay', (req, res) => {
    promise = url.parse(req.url, true).search == null
        ? paymentModel.find({
            due_date: {
                $lte: currentTime
            }
        })
        : paymentModel.find({
            _id: url.parse(req.url, true)
                    .query
                    .search,
            due_date: {
                $lte: currentTime
            }
        })

    promise.then(data => res.render('delay', { delays: data }))
           .catch(err => console.log(err));

});

router.get('/delay/delete/:id', (req, res) => {
    const promise = paymentModel.findByIdAndRemove(req.params.id);

    promise.then(data => res.redirect('/admin/delay'))
           .catch(err => res.json(err));
});
// Payments Ends Here

// Settings Starts Here
router.get('/settings', (req, res) => {
    res.render('settings');
});

router.post('/settings', (req, res) => {
    const {
        password, 
        new_password, 
        repeat
    } = req.body;

    const equal = new_password === repeat

    const promise = adminModel.findById(admin_session);

    promise.then(data => {
        if(data.password === password && equal){
            const updatePromise = adminModel.findByIdAndUpdate(
                admin_session,
                {
                    password: new_password
                },
                { new: true }
            );
            updatePromise.then(() => {
                alert('Şifre Güncellendi');
                res.render('settings');
            })
        } else{
            alert('Tekrar Giriniz');
            res.render('settings');
        }
    }).catch(err => res.json(err));
})
// Setting Ends Here

module.exports = router;