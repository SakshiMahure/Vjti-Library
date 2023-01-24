const mongoose = require('mongoose');
const Book = require('../models/book');
const BookBank = require('../models/bookBank');
const Student = require('../models/student');

module.exports.getLibraryBooks = async(id) => {
    let books = [];
    const user = await Student.findById(id).populate('issuedBooks');
    for (let book of user.issuedBooks) {
        let b = await Book.findById(book.bookId);
        books.push(b);
    }
    return books;
}

module.exports.getBookBank = async(id) => {
    let bbooks = [];
    const user = await Student.findById(id).populate('bookBank');
    for (let book of user.bookBank) {
        let b = await BookBank.findById(book.bookId);
        bbooks.push(b);
    }
    return bbooks;
}
