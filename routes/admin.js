const express = require('express');
const router = express.Router();
const passport = require('passport');
const {  validateBook, isLoggedIn, isAdminLoggedIn } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const admins=require('../controllers/admin');



router.get('/', admins.AdminDashBoard);

router.get('/register', admins.renderAdminRegister);

router.post('/register' , admins.AdminRegister);

router.get('/login', admins.renderAdminLogin);

// router.post('/login' , admins.AdminLogin );

router.post('/login', passport.authenticate('Admin', { failureFlash: true, failureRedirect: '/admin/login' }), admins.AdminLogin);

router.get('/logout', admins.AdminLogout);

router.get('/books', catchAsync(admins.index));

router.get('/new', admins.renderNewForm);

router.post('/books', validateBook, catchAsync(admins.createBook) );

router.get('/books/:id',catchAsync(admins.showBook));

router.delete('/books/:id',  catchAsync(admins.deleteBook));

router.get('/books/:id/edit', catchAsync(admins.renderEditForm));

router.put('/books/:id', validateBook, catchAsync(admins.updateBook));





module.exports = router;