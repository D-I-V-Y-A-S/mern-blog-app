const data = require('../Data/blogData')
const blogModel = require('../Model/blogModel')
const path = require('path')

const getAllblog = async (request, response) => {
    try {
        const blog = await blogModel.find().sort({blogID:1})
        
        if (blog.length === 0) {
            const blog = await blogModel.insertMany(data)
            return  response.status(200).json(blog)
        }
        response.status(200).json(blog)
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
}

const addblog = async (request, response) => {
    try {
        const { blogID, blogTitle, blogArticle, blogAuthor, blogDate, blogCategory } = request.body
        const existingblog = await blogModel.findOne({ blogID: blogID })
        if (existingblog) {
            return response.status(400).send({ message: 'blog already exists' })
        }
        const { filename } = request.file
        const blogImage = 'http://localhost:3500/api/v1/blogs/images/' + filename

        const blogData =
        {
            blogID: blogID,
            blogTitle: blogTitle,
            blogArticle: blogArticle,
            blogAuthor: blogAuthor,
            blogDate: blogDate,
            blogImage: blogImage,
            blogCategory: blogCategory
        }
        await blogModel.create(blogData)
        // JSON.stringify(blogData)
        // console.log((blogData))
        response.status(201).send({ message: `${blogTitle} added successfully` })
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
}

const updateblog = async (request, response) => {
    try {
        const { blogID, blogTitle, blogArticle, blogAuthor, blogDate, blogCategory } = request.body
        let blogImage=null
        const existingblog = await blogModel.findOne({ blogID: blogID })

        if (!existingblog) {
            return response.status(404).json({ ErrorMessage: 'blog with this ID does not exists!' })
        }
if(request.file){
        const { filename } = request.file
        blogImage = 'http://localhost:3500/api/v1/blogs/images/' + filename
}
else{
blogImage=existingblog.blogImage
}

        existingblog.blogID= blogID,
        existingblog.blogTitle= blogTitle,
        existingblog. blogArticle= blogArticle,
        existingblog.blogAuthor= blogAuthor,
        existingblog.blogDate= blogDate,
        existingblog.blogImage= blogImage,
        existingblog.blogCategory= blogCategory
        await existingblog.save()
        response.status(201).json({ message:"data updated successfully!" })
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteblog = async (request, response) => {
    const blogToBeDeleted = request.query.blogID;
    try {
        const blog = await blogModel.findOne({ blogID: blogToBeDeleted })
        console.log(blog)
        if (blog) {
            const blogName = blog.blogTitle
            await blogModel.deleteOne({ blogID: blogToBeDeleted })
            response.status(200).send({ message: `${blogName} deleted successfully!` })
        }
        else {
            response.status(404).send({ message: "blog not found!" })
        }
    }
    catch (error) {
        response.status(500).send({ message: error.message });
    }
}

module.exports = { getAllblog, addblog, updateblog, deleteblog }