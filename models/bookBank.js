const mongoose= require('mongoose');
const Schema= mongoose.Schema; 

const BookBankSchema= new Schema( {
    title : {
        type: String,
        required: true
    },
    book_author:[{
        type: String,
        required: true
    }],
    edition: {
        type: Number
    },
    subject: {
        type: String,
        required: true
    },
    availableCopies: {
        type: Number, 
        min: 0
    },
    issuedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
})

module.exports = mongoose.model('BookBank', BookBankSchema);
