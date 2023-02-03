const mongoose = require('mongoose');
const BookBank = require('../models/bookBank');
const books = require('./books_seeds');

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

mongoose.connect('mongodb://localhost:27017/vjti-library', options, () => {
    console.log("Connected to database")
})

mongoose.set('strictQuery', true);

const seedBookBankDb = async() => {
    await BookBank.deleteMany({});
    for (let i=0; i<10; i++)
    {
        const B = new BookBank({
            title: `${books[i].title}`,
            book_author: [...books[i].book_author],
            edition: books[i].edition, 
            subject: `${books[i].subject}`,
            totalCopies: (books[i].totalCopies - books[i].availableCopies) + 5,
            availableCopies: (books[i].totalCopies - books[i].availableCopies) + 5,
            images: `${books[i].images}`
        })
        await B.save();
    }
}

seedBookBankDb().then( () => {
    mongoose.connection.close();
});