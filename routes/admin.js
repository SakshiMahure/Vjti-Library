const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isAdminLoggedIn , validateBook } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const admins=require('../controllers/admin');



router.get('/',isAdminLoggedIn, admins.AdminDashBoard);

router.get('/register', admins.renderAdminRegister);

router.post('/register' , admins.AdminRegister);

router.get('/login', admins.renderAdminLogin);

// router.post('/login' , admins.AdminLogin );

router.post('/admin/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login' }), admins.AdminLogin);

router.get('/logout', admins.AdminLogout);

router.get('/books', catchAsync(admins.index));

router.get('/books/:id',catchAsync(admins.showBook));

router.delete('/books/:id',  catchAsync(admins.deleteBook));

router.post('/books/:id', validateBook, catchAsync(admins.updateBook));

router.get('/books/:id/edit', catchAsync(admins.renderEditForm));



module.exports = router;