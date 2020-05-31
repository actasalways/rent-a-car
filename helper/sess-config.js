module.exports.sess_in = (req, res, next) => 
    !req.session.user_id
        ? res.redirect('/login')
        : next()

module.exports.sess_out = (req, res, next) =>
    req.session.user_id
        ? res.redirect('/cvc')
        : next()