const mongoose = require('mongoose');
const Book = require('../models/book');
const books = require('./books_seeds');

/*const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};*/

mongoose.connect('mongodb://localhost:27017/vjti-library', options, () => {
    console.log("Connected to database")
})

mongoose.set('strictQuery', true);

const seedBooksDb = async() => {
    await Book.deleteMany({});
    for (let i=0; i<10; i++)
    {
        const B = new Book({
            title: `${books[i].title}`,
            book_author: [...books[i].book_author],
            edition: books[i].edition, 
            subject: `${books[i].subject}`,
            totalCopies: books[i].totalCopies, 
            availableCopies: books[i].availableCopies,
            images: books[i].images,
            description: `${books[i].description}`
        })
        await B.save();
    }
}

seedBooksDb().then( () => {
    mongoose.connection.close();
});