const express = require('express');
const router = express.Router();
const passport = require('passport');
const {  validateBook, isLoggedIn, isAdminLoggedIn } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const admins=require('../controllers/admin');


router.get('/',  admins.AdminDashBoard);

router.get('/notify', admins.Notification);

router.get('/register', admins.renderAdminRegister);

router.get('/reqbook', admins.showReqBook);

router.post('/register' , admins.AdminRegister);

router.get('/login', admins.renderAdminLogin);

// router.post('/login' , admins.AdminLogin );

router.post('/login', passport.authenticate('Admin', { failureFlash: true, failureRedirect: '/admin/login' }), admins.AdminLogin);

router.get('/logout', admins.AdminLogout);

router.get('/books', catchAsync(admins.index));

router.get('/bookbank', catchAsync(admins.BookbankIndex));

router.get('/new', admins.renderNewForm);

router.get('/newBookbank', admins.renderNewFormBookbank);

router.post('/books', validateBook, catchAsync(admins.createBook) );

router.post('/bookbank', validateBook, catchAsync(admins.createBookbank));

router.get('/showIssuedBooks', catchAsync(admins.showIssuedBook));

router.get('/showIssuedBookbank', catchAsync(admins.showIssuedBookbank));

router.get('/searchStudent', catchAsync(admins.renderSearchStudent));

router.put('/searchStudent', catchAsync(admins.searchStudent));

router.get('/books/:id',catchAsync(admins.showBook));

router.get('/bookbank/:id',catchAsync(admins.showBookbank));

router.delete('/books/:id',  catchAsync(admins.deleteBook));

router.delete('/bookbank/:id',  catchAsync(admins.deleteBookbank));

router.delete('/reqbook/:id',  catchAsync(admins.deleteReqBook));

router.put('/books/:id', validateBook, catchAsync(admins.updateBook));

router.put('/bookbank/:id', validateBook, catchAsync(admins.updateBookbank));

router.get('/books/:id/edit', catchAsync(admins.renderEditForm));

router.get('/bookbank/:id/edit', catchAsync(admins.renderEditFormBookbank));

router.get('/:id/edit', catchAsync(admins.renderEditStudentProfile));

router.put('/:id/edit', catchAsync(admins.editProfile));

router.get('/:id/unblock', catchAsync(admins.renderUnblock));

router.put('/:id/unblock', catchAsync(admins.Unblock));

router.get('/:id/waitlist', catchAsync(admins.renderWaitlist));

router.put('/:bookId/:studentId/returnBook', catchAsync(admins.returnBook));

router.put('/:bookId/:studentId/returnBookbank', catchAsync(admins.returnBookbank));

router.put('/:bookId/:studentId/remove', catchAsync(admins.removeFromWaitlist));

module.exports = router;