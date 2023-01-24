const mongoose = require('mongoose');
const { findById } = require('../models/book');
const { getdate, getSemEnd } = require('../utilities/getdate');
const Student = require('../models/student');
const BookBank = require('../models/bookBank');

module.exports.bookBankIndex= async(req,res) => {
    const books = await BookBank.find({});
    res.render('bookbank/index', { books });
}

module.exports.showBook = async(req, res) => {
    const { id } = req.params;
    const book = await BookBank.findById(id);
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/bookbank');
    }
    req.flash('success', 'Book found');
    res.render('bookbank/show', { book } ); 
}

module.exports.issueBook = async(req, res) => {
    const bookId = req.params.id;
    const book = await BookBank.findById(bookId);
    const userId = req.user._id;
    const dateIssued = getdate();
    const deadline = getSemEnd();
    if (book.availableCopies > 0) {
        const aCopies = book.availableCopies - 1;
        bookBank = { bookId, dateIssued, deadline };
        await BookBank.findByIdAndUpdate(bookId, {$set: {availableCopies: aCopies}});
        await Student.findByIdAndUpdate(userId, {$push: {bookBank}});
        req.flash('success', 'Book issued!'); 
    }
    else{
        req.flash('error', 'Book not available');
    } 
    res.redirect(`/bookbank/${bookId}`);
}