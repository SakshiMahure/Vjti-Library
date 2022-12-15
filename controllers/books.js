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

module.exports.showBook = async(req, res,) => {
    const book = await Book.findById(req.params.id).populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/books');
    }
    res.render('books/show', { book });
}



module.exports.deleteBook = async(req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/books');
}