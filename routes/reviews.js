const express= require('express');
const router=express.Router({mergeParams:true});
const catchAsync= require('../utilities/catchAsync');     //..
const ExpressError= require('../utilities/ExpressError');   //.. 
const review= require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');


router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview));

module.exports= router;