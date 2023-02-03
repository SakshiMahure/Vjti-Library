const express= require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');  
const BookBank = require('../models/bookBank');    
const { isLoggedIn, isAuthor, validateBook } = require('../middleware');
const bookBank = require('../controllers/bookBank');

router.get('/', catchAsync(bookBank.bookBankIndex));

router.get('/:id', catchAsync(bookBank.showBook));

router.put('/:id/issue', isLoggedIn, catchAsync(bookBank.issueBook));

module.exports=router;