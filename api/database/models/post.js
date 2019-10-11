
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise;


// Define postSchema
const postSchema = new Schema({
    authorName: { type: String,  required: true },
    authorEmail: { type: String,  required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String,  required: true },
    comments : [
        {
            text: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comments : [
                {
                    text : String,
                    postedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    }
                }
            ]
        }
    ]
})



const Posts = mongoose.model('Posts', postSchema)
module.exports = Posts;