const mongoose = require('mongoose');
const Book = require('../models/book');
const books = require('./books_seeds');


mongoose.connect('mongodb://127.0.0.1:27017/vjti-library', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const seedBooksDb = async() => {
    await Book.deleteMany({});
    for (let i=0; i<10; i++)
    {
        const B = new Book({
            //admin:'63ce43f36a9250a107ce4428',
            title: `${books[i].title}`,
            book_author: [...books[i].book_author],
            edition: books[i].edition, 
            popularity: 0,
            subject: `${books[i].subject}`,
            totalCopies: books[i].totalCopies, 
            availableCopies: books[i].availableCopies,
            images: `${books[i].images}`,
            description: `${books[i].description}`
        })
        await B.save();
    }
}

seedBooksDb().then( () => {
    mongoose.connection.close();
});