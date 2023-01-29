const express= require('express');
const router=express.Router();
const catchAsync= require('../utilities/catchAsync'); 
 //.. to go back in our vjti-library folder and then to get inside utilities folder.
const Book= require('../models/book');    //..
const { isLoggedIn,  validateBook } = require('../middleware');
const books= require('../controllers/books');


router.get('/',isLoggedIn, catchAsync(books.index));

router.put('/likes',isLoggedIn, catchAsync(books.likes));



router.get('/requestbook', catchAsync(books.requestBookForm));

router.post('/requestbook', catchAsync(books.addRequestBook) );

router.get('/rules', catchAsync(books.showRules));

router.get('/bookbank', catchAsync(books.bookBank));

router.get('/reqbook', catchAsync(books.showRequestBook));

router.get('/eresources', catchAsync(books.getEresources));



router.get('/:id',catchAsync(books.showBook));

router.put('/:id/wishlist', isLoggedIn, catchAsync(books.addToWishlist));

router.put('/:id/issue', isLoggedIn, catchAsync(books.issueBook));

router.put('/:id/waitlist', isLoggedIn, catchAsync(books.addToWaitList));

module.exports=router;
