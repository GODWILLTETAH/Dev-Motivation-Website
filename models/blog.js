const mongoose = require ('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type : String,
        required: 'This field is required',
    },
    content: {
        type: String,
        required: 'This field is required'
    },
    image:{
        type: String,
        //required: 'This field is required'
    },
    date: {
        type: String,
        default: Date.now()
      },
    excerpt: {
        type: String,
        required:true,
    },
    tag:{
        type: String
    },
    author:{
        type: String,
        required: true,
        default: 'admin'
    }
});

const Blog = mongoose.model ('Blog', BlogSchema);

module.exports = Blog;

