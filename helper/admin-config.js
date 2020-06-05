module.exports.admin_check = (req, res, next) => 
    !req.session.admin_session
        ? res.redirect('/adminLogin')
        : next();

module.exports.admin_login = (req, res, next) =>
    req.session.admin_session
        ? res.redirect('/admin')
        : next();