// logic of our user routes are stored here!

const User = require('../models/user');
const flash= require('connect-flash');

module.exports.renderRegister= (req, res) => {
    res.render('users/register');
}

module.exports.register=async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Vjti Library!');
            res.redirect('/books');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}


module.exports.renderLogin=(req, res) => {
    res.render('users/login');
}


module.exports.login= (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/books';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


module.exports.logout=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      res.redirect('/books');
    });
}