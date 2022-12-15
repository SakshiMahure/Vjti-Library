// logic of our review routes are stored here!

const Book= require('../models/book');
const Review = require('../models/review');


module.exports.createReview=async (req,res) => {
    const book=await Book.findById(req.params.id);
    const review=new Review(req.body.review);
    review.author= req.user._id;
    book.review.push(review);
    await review.save();
    await book.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/books/${book._id}`);
 }


module.exports.deleteReview=async(req,res) => {
    const {id, reviewId}= req.params;
    await Book.findByIdAndUpdate(id, {$pull:{review:reviewId}});//$pull: to delete from array
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted the review');
    res.redirect(`/books/${id}`)
 }