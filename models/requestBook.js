const mongoose= require('mongoose');
const {Schema}= mongoose;
//const Book = require('./book');

const ReqBookSchema= new Schema({
    book_title: {
        type:String,
        //required:true
    },
    book_author:{
        type: String,
        //required: true
    },
    book_subject:{
        type:String,
        //required: true
    },
    book_edition: {
        type:Number,
        //required: true
    },
    book_likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]    
})

module.exports= mongoose.model('ReqBook' , ReqBookSchema);