const { BookSchema, ReviewSchema } = require('./schemas(error_handling).js');
const ExpressError = require('./utilities/ExpressError');
const Book = require('./models/book');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateBook= (req,res,next) => {
    const {error}= BookSchema.validate(req.body);
    if(error){
       const msg=error.details.map(el => el.message).join(',');
       throw new ExpressError(msg, 400);
    }
    else{
       next();
    }
 }

 module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/books/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/books/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


