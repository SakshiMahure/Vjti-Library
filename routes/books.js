const express= require('express');
const router=express.Router();
const catchAsync= require('../utilities/catchAsync');   //..
 //.. to go back in our yelpcamp folder and then to get inside utilities folder.
const Book= require('../models/book');    //..
const { isLoggedIn, isAuthor, validateBook } = require('../middleware');
const books= require('../controllers/books');
//const multer = require('multer');
//const { storage } = require('../cloudinary');
//const upload = multer({ storage });

router.get('/', catchAsync(books.index));

router.get('/rules', catchAsync(books.showRules));

router.get('/bookbank', catchAsync(books.bookBank));

router.get('/:id',catchAsync(books.showBook));

router.delete('/:id', isLoggedIn ,isAuthor, catchAsync(books.deleteBook));



module.exports=router;
