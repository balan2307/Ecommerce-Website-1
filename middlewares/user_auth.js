const isLoggedIn = (req, res, next) => {
    req.session.store ? next() : res.redirect('/admin/register');
}

module.exports = isLoggedIn;