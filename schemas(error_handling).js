const joi= require('joi');
const { number } = require('joi');

module.exports.BookSchema= joi.object({
    book:joi.object({
     title:joi.string().required(),
     book_author:joi.string().required(),
     images:joi.string().required(),
     subject:joi.string().required(),
     edition:joi.number().required(),
     totalCopies:joi.number().required().min(0),
     availableCopies:joi.number().min(0),
     
    }).required(),
    //deleteImages: joi.array()
 })

 module.exports.ReviewSchema= joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        body:joi.string().required()
    }).required()
 })