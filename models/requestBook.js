const mongoose= require('mongoose');
const {Schema}= mongoose;
const Book = require('./book');

const ReqBookSchema= new Schema({
    book_title: {
        type:String,
        required:true
    },
    book_author:{
        type: String,
        required: true
    },
    book_subject:{
        type:String,
        required: true
    }
    
})

module.exports= mongoose.model('ReqBook' , ReqBookSchema);