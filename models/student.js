const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    regId: {
        type: Number,
        required: true
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    issuedBooks: {
        type: Map,
        of: new Schema({
            bookId: {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            },
            dateIssued: {
                type: Date
            }
        })
    }
})

module.exports = mongoose.model('Student', StudentSchema);