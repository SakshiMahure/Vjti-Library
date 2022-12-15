const mongoose= require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema= mongoose.Schema; 

const ImageSchema = new Schema({
    url: String
});


const BookSchema= new Schema( {
    title : {
        type: String,
        required: true
    },
    book_author:[{
        type: String,
        required: true
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    edition: {
        type: Number
    },
    subject: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        min: 0
    },
    totalCopies: {
        type: Number, 
        min: 0
    },
    availableCopies: {
        type: Number, 
        min: 0
    },
    images: ImageSchema,
    description: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ]
})


 
 BookSchema.post('findOneAndDelete', async function (doc) {
     await Review.deleteMany({
      _id: {
          $in: doc.review
      }
     })
  })

module.exports= mongoose.model('Book', BookSchema);









