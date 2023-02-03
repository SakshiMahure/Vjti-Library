// logic of our user routes are stored here!


const Student = require('../models/student');
const flash= require('connect-flash');
const { getLibraryBooks, getBookBank } = require('../utilities/getBooks');

module.exports.renderRegister= (req, res) => {
    res.render('users/register');
}

module.exports.register=async (req, res, next) => {
    try {
        const { email, username, regId, password } = req.body;
        const user = new Student({ email, username, regId });
        const registeredUser = await Student.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Vjti Library!');
            res.redirect('/student_home');
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
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/student_home';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.student_home= async(req,res) => {
    res.render('users/student_home');
}

module.exports.logout=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      res.redirect('/');
    });
}

module.exports.renderProfile = async(req, res) => {
    const userId = req.user._id;
    let books = [];
    let bbooks = [];
    let status = "student";
    const user = await Student.findById(userId).populate('wishlist').populate('waitlist');
    books = await getLibraryBooks(userId);
    bbooks = await getBookBank(userId);
    res.render('users/profile', { user, books, bbooks, status });
}