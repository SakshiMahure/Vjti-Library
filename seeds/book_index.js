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
            author:'639b5d51eae11985379d93f1',
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