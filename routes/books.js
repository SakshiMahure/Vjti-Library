const express= require('express');
const router=express.Router();
const catchAsync= require('../utilities/catchAsync'); 
 //.. to go back in our vjti-library folder and then to get inside utilities folder.
const Book= require('../models/book');    //..
const { isLoggedIn,  validateBook } = require('../middleware');
const books= require('../controllers/books');


router.get('/',isLoggedIn, catchAsync(books.index));

router.get('/eResources', isLoggedIn,  catchAsync(books.eResource));

router.get('/requestbook', catchAsync(books.requestBookForm));

router.post('/requestbook', catchAsync(books.addRequestBook) );

router.get('/rules', catchAsync(books.showRules));

router.get('/bookbank', catchAsync(books.bookBank));

router.get('/reqbook', catchAsync(books.showRequestBook));

router.get('/popular', isLoggedIn, catchAsync(books.renderPopularTitles));
router.get('/pyqs/ce', catchAsync(books.ce))

router.get('/pyqs/fy', catchAsync(books.fy))

router.get('/pyqs/ele', catchAsync(books.ele))

router.get('/pyqs/mech', catchAsync(books.mech))

router.get('/pyqs/prod', catchAsync(books.prod))

router.get('/pyqs/textile', catchAsync(books.textile))

router.get('/pyqs/civil', catchAsync(books.civil))

router.get('/pyqs/struct', catchAsync(books.struct))

router.get('/pyqs', catchAsync(books.pyqs));

router.get('/waitinglist', catchAsync(books.Wlist));

router.get('/wishlist', catchAsync(books.Wishl));

router.get('/:id', isLoggedIn, catchAsync(books.showBook));

router.put('/:id/likes', catchAsync(books.likes));

router.put('/:id/wishlist', isLoggedIn, catchAsync(books.addToWishlist));

router.put('/:id/issue', isLoggedIn, catchAsync(books.issueBook));

router.put('/:id/waitlist', isLoggedIn, catchAsync(books.addToWaitList));

router.put('/:id/removeFromWaitlist', catchAsync(books.removeFromWaitlist));

router.put('/:id/removeFromWishlist', catchAsync(books.removeFromWishlist));

router.put('/:id/')

module.exports=router;
