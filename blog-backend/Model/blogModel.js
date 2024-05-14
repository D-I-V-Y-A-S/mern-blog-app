const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
blogID: {
    type:String,
    required:true,
    unique:true,
    index:true
},
blogTitle: {
    type:String,
    required:true,
},
blogArticle: {
    type:String,
    required:true,
},
blogAuthor: {
    type:String,
    required:true,
},
blogCategory: {
    type:String,
    required:true,
    enum:["technology","fitness","entertainment","fashion"]
},
blogImage: {
    type:String,
    required:true,
},
likes:{
    type:Number,
    required:true,
    default:1
},
comments: {
    type:Number,
    required:true,
    default:1
},
blogDate:{
    type:Date,
    required:true,
}
},{collection:'blogs'})
module.exports=mongoose.model('blogs', blogSchema)
