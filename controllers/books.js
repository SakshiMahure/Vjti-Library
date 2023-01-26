// logic of our books routes are stored here!

const Book = require('../models/book');


module.exports.index = async(req, res) => {
    const books = await Book.find({});
    res.render('books/index', { books })
}

module.exports.showRules= async(req,res) => {
    res.render('books/rules');
}

module.exports.bookBank= async(req,res) => {
    res.render('books/bookBank');
}

module.exports.getEresources= async(req,res) => {
    res.render('books/eResources');
}
module.exports.showBook = async(req, res,) => {
    const book = await Book.findById(req.params.id).populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    });
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/books');
    }
    res.render('books/show', { book });
}





module.exports.addToWishlist = async(req, res) => {
    const bookId = req.params.id;
    const user = await Student.findById(req.user._id);
    if (!user) {
        req.flash('error', 'Error');
        return res.redirect(`/books/${bookId}`);
    }
    await Student.findByIdAndUpdate(req.user._id, {$push: {wishlist: bookId}});
    req.flash('success', 'Book added to wishlist');
    res.redirect(`/books/${bookId}`);
}

module.exports.issueBook = async(req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const userId = req.user._id;
    const dateIssued = getdate();
    const deadline = getDeadline();
    if (book.availableCopies > 0) {
        const aCopies = book.availableCopies - 1;
        issuedBooks = { bookId, dateIssued, deadline };
        await Book.findByIdAndUpdate(bookId, {$set: {availableCopies: aCopies}, $push: {issuedBy: userId}});
        await Student.findByIdAndUpdate(userId, {$push: {issuedBooks}});
        req.flash('success', 'Book issued!'); 
    }
    else{
        req.flash('error', 'Book not available');
    } 
    res.redirect(`/books/${bookId}`);
}

module.exports.addToWaitList = async(req, res) => {
    const bookId = req.params.id;
    const userId = req.user._id;
    const book = await Book.findById(bookId);
    if ((book.waitlist).includes(userId))
    {
        req.flash('error', "Name already in waiting list!")
    }
    else {
        await Book.findByIdAndUpdate(bookId, {$push: {waitlist: userId}});
        await Student.findByIdAndUpdate(userId, { $push: { waitlist: bookId }});
        req.flash('success', 'Name added to waiting list!');
    }
    res.redirect(`/books/${bookId}`);
}