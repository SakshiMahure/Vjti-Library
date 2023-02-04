// logic of our books routes are stored here!
const mongoose = require('mongoose');
const Book = require('../models/book');
const ReqBook = require('../models/requestBook');
const Student = require('../models/student');
const getdate = require('../utilities/getdate');
const { getLibraryBooks, getBookBank } = require('../utilities/getBooks');

module.exports.index = async(req, res) => {
    const books = await Book.find({});
    res.render('books/index', { books })
}

module.exports.pyqs= async(req,res) => { 
    res.render('books/pyqs');
}
module.exports.ce= async(req,res) => {
    res.render('books/pyqs/ce');
}

module.exports.civil= async(req,res) => {
    res.render('books/pyqs/civil');
}

module.exports.ele= async(req,res) => {
    res.render('books/pyqs/ele');
}

module.exports.mech= async(req,res) => {
    res.render('books/pyqs/mech');
}

module.exports.prod= async(req,res) => {
    res.render('books/pyqs/prod');
}

module.exports.struct= async(req,res) => {
    res.render('books/pyqs/struct');
}

module.exports.textile= async(req,res) => {
    res.render('books/pyqs/textile');
}

module.exports.fy= async(req,res) => {
    res.render('books/pyqs/1year');
}

module.exports.eResource= async(req,res) => {
    res.render('books/eResources');
}

module.exports.Wishl= async(req,res) => {
    const studentId = req.user._id;
    const student = await Student.findById(studentId).populate('wishlist');
    res.render('books/wishlist', { student });
}

module.exports.Wlist= async(req,res) => {
    const studentId = req.user._id;
    const student = await Student.findById(studentId).populate('waitlist');
    res.render('books/waitinglist', { student });
}

module.exports.requestBookForm= async(req,res) => {
    res.render('books/requestbook');
}


module.exports.likes= async(req,res) => {
    const bookId = req.params.id;
    const studentId = req.user._id
    const book = await ReqBook.findById(bookId);
    if ((book.book_likes).includes(studentId)){
        req.flash('error', "Cannot like more than once!")
    }
    else {
        await ReqBook.findByIdAndUpdate(bookId, { $push: { book_likes: studentId }});
        req.flash('success', "Liked!");
    }
    res.redirect('/books/reqbook');
}



// module.exports.likes= async(req, res) => {
//     ReqBook.findById(req.params.id, function (err, reqbook) {
//         if (err) {
//             console.log(err);
//             req.flash('error', "something went wrong!!")
//         } else {
//             reqbook.book_like += 1;
//             reqbook.save(function(err){
//             if (err) return req.flash('error', "something went wrong!!!")
//             return res.send({likeCount: reqbook.book_like});
//             }); //something like this...
//         }
//     });
// }


module.exports.addRequestBook= async (req, res, next) => {
    const reqbook = new ReqBook({...req.body.reqbook});
    await reqbook.save();
    //console.log(book);
    req.flash('success', 'Successfully requested a book!');
    res.redirect(`/books/reqbook`);
  }

  module.exports.showRequestBook= async(req, res) => {
    const requestedBooks = await ReqBook.find({});
    res.render('books/showRequestBook', { requestedBooks })
}

module.exports.showRules= async(req,res) => {
    res.render('books/rules');
}

module.exports.bookBank= async(req,res) => {
    res.render('books/bookBank');
}


module.exports.renderPopularTitles = async(req, res) => {
    const books = await Book.find({});
    books.sort(function compareFunc (b1, b2) {
        if (b1.popularity > b2.popularity){
            return -1;
        }
        else if (b1.popularity < b2.popularity){
            return 1;
        }
        else { return 0; }
    })
    res.render('books/popularTitles', { books });
}

module.exports.showBook = async(req, res) => {
    const { id } = req.params;
    const userId = req.user;
    const book = await Book.findById(id).populate('issuedBy');
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/books');
    }
    req.flash('success', 'Book found');
    res.render('books/show', { book, userId } ); 
}

module.exports.addToWishlist = async(req, res) => {
    const bookId = req.params.id;
    const user = await Student.findById(req.user._id);
    if (!user) {
        req.flash('error', 'Error');
        return res.redirect(`/books/${bookId}`);
    }
    if((user.wishlist).includes(bookId)){
        req.flash('error', "Book already in wishlist");
    }
    else{
        await Student.findByIdAndUpdate(req.user._id, {$push: {wishlist: bookId}});
        req.flash('success', 'Book added to wishlist');
    }
    res.redirect(`/books/${bookId}`);
}

module.exports.issueBook = async(req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const userId = req.user._id;
    const student = await Student.findById(userId);
    const dateIssued = getdate(0);
    const deadline = getdate(7);
    if ((book.issuedBy).includes(userId)){
        req.flash('error', 'Book already issued!');
    }
    else if (((book.waitlist).length !== 0) && !((book.waitlist).at(0)).equals(userId)){
        req.flash('error', "Sorry! Book cannot be issued! There are people in the waiting list!");
    }
    else if ((student.issuedBooks).length >= 5) {
        req.flash('error', "Sorry! You have already issued the maximum number of books!");
    }
    else if ((student.blacklisted) === true ){
        req.flash('error', "Cannot issue book to defaulter!");
    }
    else {
        if (book.availableCopies > 0) {
            const aCopies = (book.availableCopies - 1);
            const p = book.popularity + 1;
            issuedBooks = { bookId, dateIssued, deadline };
            await Book.findByIdAndUpdate(bookId, {$set: {availableCopies: aCopies, popularity: p}, $push: {issuedBy : userId}});
            await Student.findByIdAndUpdate(userId, {$push: {issuedBooks}});
            if ((book.waitlist).length !== 0){
                const removeUser = await Book.findByIdAndUpdate(bookId, { $pop: { waitlist: -1}});
                const removeBook = await Student.findByIdAndUpdate(userId, { $pull: { waitlist: bookId}});
            }
            req.flash('success', 'Book issued!'); 
        }
    }
    res.redirect(`/books/${bookId}`);
}

module.exports.addToWaitList = async(req, res) => {
    const bookId = req.params.id;
    const userId = req.user._id;
    const book = await Book.findById(bookId);
    const student = await Student.findById(userId);
    if ((book.waitlist).includes(userId))
    {
        req.flash('error', "Name already in waiting list!")
    }
    else if ((book.issuedBy).includes(userId)){
        req.flash('error', "Book already issued!");
    }
    else if ((student.blacklisted) === true ){
        req.flash('error', "Cannot issue book to defaulter!");
    }
    else {
        await Book.findByIdAndUpdate(bookId, {$push: {waitlist: userId}});
        await Student.findByIdAndUpdate(userId, { $push: { waitlist: bookId }});
        req.flash('success', 'Name added to waiting list!');
    }
    res.redirect(`/books/${bookId}`);
}

module.exports.removeFromWaitlist = async(req, res) => {
    const bookId = req.params.id;
    const studentId = req.user._id;
    await Student.findByIdAndUpdate(studentId, { $pull: { waitlist: bookId }});
    await Book.findByIdAndUpdate(bookId, { $pull: { waitlist: studentId }});
    req.flash('success', "Name removed from waiting list!");
    res.redirect('/books/waitinglist');
  }

  module.exports.removeFromWishlist = async(req, res) => {
    const bookId = req.params.id;
    const studentId = req.user._id;
    await Student.findByIdAndUpdate(studentId, { $pull: { wishlist: bookId }});
    req.flash('success', "Book removed from wish list!");
    res.redirect('/books/wishlist');
  }