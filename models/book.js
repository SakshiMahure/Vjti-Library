const mongoose= require('mongoose');
//const Review = require('./review');
const Admin = require('./admin');
const Schema= mongoose.Schema; 

// const ImageSchema = new Schema({
//     url: String
// });


const BookSchema= new Schema( {
    title : {
        type: String,
        required: true
    },
    book_author:[{
        type: String,
        required: true
    }],
    // admin: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Admin'
    // },
    edition: {
        type: Number
    },
    subject: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        min: 0,
        default:0
    },
    totalCopies: {
        type: Number, 
        min: 0
    },
    availableCopies: {
        type: Number, 
        min: 0
    },
    images: String, // ImageSchema
    description: String,
    
    waitlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    issuedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
})


 
//  BookSchema.post('findOneAndDelete', async function (doc) {
//      await Review.deleteMany({
//       _id: {
//           $in: doc.review
//       }
//      })
//   })

module.exports= mongoose.model('Book', BookSchema);









