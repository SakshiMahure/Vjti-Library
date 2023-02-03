const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const users=require('../controllers/users');
const { isValidUser, isLoggedIn } = require('../middleware');

router.get('/register', users.renderRegister);

router.post('/register', isValidUser, catchAsync(users.register));

router.get('/login', users.renderLogin);

router.post('/login', passport.authenticate('Student', { failureFlash: true, failureRedirect: '/' }), users.login);

router.get('/student_home' ,isLoggedIn, catchAsync(users.student_home));

router.get('/logout', users.logout);

router.get('/profile', isLoggedIn, users.renderProfile);

module.exports = router;




