const mongoose = require('mongoose');
const { findById } = require('../models/book');
const getdate = require('../utilities/getdate');
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
    const student = await Student.findById(userId);
    const dateIssued = getdate(0);
    const deadline = getdate(124);
    if ((book.issuedBy).includes(userId)){
        req.flash('error', 'Book already issued!');
    }
    else if ((student.issuedBooks).length >= 6) {
        req.flash('error', "Sorry! Book cannot be issued! You have already issued the maximum number of books!");
    }
    else if ((student.blacklisted) === true ){
        req.flash('error', "Cannot issue book to defaulter!");
    }
    else{
        if (book.availableCopies > 0) {
            const aCopies = book.availableCopies - 1;
            bookBank = { bookId, dateIssued, deadline };
            await BookBank.findByIdAndUpdate(bookId, {$set: {availableCopies: aCopies}, $push: {issuedBy : userId}});
            await Student.findByIdAndUpdate(userId, {$push: {bookBank}});
            req.flash('success', 'Book issued!'); 
        }
    } 
    res.redirect(`/bookbank/${bookId}`);
}