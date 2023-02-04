const { BookSchema, ReviewSchema } = require('./schemas(error_handling).js');
const ExpressError = require('./utilities/ExpressError');
const Book = require('./models/book');
//const Review = require('./models/review');
const Admin = require('./models/admin');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdminLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/admin/login');
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

//  module.exports.isAdmin = async (req, res, next) => {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     if (!book.admin.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/admin/books/${id}`);
//     }
//     next();
// }

// module.exports.isAdmin= async (req,res,next) => {
//     const userId= req.user;
//     const user= await Admin.findById(userId);
//     if(!user) {
//         req.flash("you are not an admin!");
//         res.redirect("/admin/login");
//     }
    
//     next();
// }

module.exports.isValidUser= (req, res, next) => {
    let s= req.body.email.slice(-14); 
    let str = s.slice(1, 3);
    
    console.log(req.body.email);
    
   if (str === 'ce' || str === 'it' || str === 'et' || str ==='el'|| str=== 'ee' || str==='me' || str==='ci' || str==='pe' || str==='tx') 
   { 
       if (!(s===`@${str}.vjti.ac.in`)) { 
        req.flash('error', 'NOT A VALID VJTI STUDENT'); 
        res.redirect('/register');
        }
    next();
}
    else {
    req.flash('error', 'NOT A VALID VJTI STUDENT');
    res.redirect('/register');
    
}
}



// module.exports.isReviewAuthor = async (req, res, next) => {
//     const { id, reviewId } = req.params;
//     const review = await Review.findById(reviewId);
//     if (!review.author.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/books/${id}`);
//     }
//     next();
// }

// module.exports.validateReview = (req, res, next) => {
//     const { error } = ReviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }


