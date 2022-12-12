const mongoose= require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema= mongoose.Schema; 

// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
    url: String,
    filename: String
});

/*ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});*/

const BookSchema= new Schema( {
    title: String,
    images: [ImageSchema],
    description: String,
    Book_Author: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review' //name of model....case-sensitive
        }
    ]
})


//to delete a Book
//such that when a Book is deleted all reviews in that Book Section should also be deleted from reviews collection in our db. 
BookSchema.post('findOneAndDelete', async function (doc) {
    await Review.deleteMany({
     _id: {
         $in: doc.review
     }
    })
 })

module.exports= mongoose.model('Book', BookSchema);









