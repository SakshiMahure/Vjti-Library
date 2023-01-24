const express= require('express');
const router=express.Router();
const catchAsync= require('../utilities/catchAsync');   //..
 //.. to go back in our yelpcamp folder and then to get inside utilities folder.
const Book= require('../models/book');    //..
const { isLoggedIn, isAdmin, validateBook } = require('../middleware');
const books= require('../controllers/books');


router.get('/', catchAsync(books.index));

router.get('/rules', catchAsync(books.showRules));

router.get('/bookbank', catchAsync(books.bookBank));

router.get('/student_home', catchAsync(books.student_home));

router.get('/eResources', catchAsync(books.eResource));

router.get('/:id',catchAsync(books.showBook));

router.put('/:id/wishlist', isLoggedIn, catchAsync(books.addToWishlist));

router.put('/:id/issue', isLoggedIn, catchAsync(books.issueBook));

router.put('/:id/waitlist', isLoggedIn, catchAsync(books.addToWaitList));

module.exports=router;
