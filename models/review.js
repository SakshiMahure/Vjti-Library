const mongoose= require('mongoose');
const {Schema}= mongoose;
const Student = require('./student');

const ReviewSchema= new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports= mongoose.model('Review' , ReviewSchema);