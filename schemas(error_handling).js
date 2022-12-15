const joi= require('joi');
const { number } = require('joi');

module.exports.BookSchema= joi.object({
    book:joi.object({
     title:joi.string().required(),
     book_author:joi.string().required(),
     //image:joi.string().required(),
     description:joi.string().required(),
     
    }).required(),
    deleteImages: joi.array()
 })

 module.exports.ReviewSchema= joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        body:joi.string().required()
    }).required()
 })