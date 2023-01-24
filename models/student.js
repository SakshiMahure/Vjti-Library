const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');
const passportLocalMongoose = require('passport-local-mongoose');

const StudentSchema = new Schema({
    image: {
        type: String,
        default: "",
    },
     username: {
         type: String,
         required: true
    },
     email: {
         type: String,
         required: true
     },
     regId: {
        type: Number,
        required:true
     },
     wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    issuedBooks: [{
        bookId: { type: Schema.Types.ObjectId, ref: 'Book'},
        dateIssued: { type: String },
        deadline: { type: String },
        dateReturned: { type: String } 
    }],
    bookBank: [{
        bookId: { type: Schema.Types.ObjectId, ref: 'BookBank'},
        dateIssued: { type: String },
        deadline: { type: String },
        dateReturned: { type: String } 
    }],
    waitlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    fines: { type: Number, default: 0 }
 })

 StudentSchema.plugin(passportLocalMongoose); 
 module.exports = mongoose.model('Student', StudentSchema);