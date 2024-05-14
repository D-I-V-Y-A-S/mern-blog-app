import React, { useState } from 'react'
import './HomePageComponent.css'

const DisplayComponent = ({ blog }) => {
 //likes and comments
 const [Like, setLike] = useState(blog.likes)
 const [Comment, setComment] = useState(blog.comments)

 const incrementComment = () => {
     setComment(prevComment => prevComment + 1);
 }
 const incrementCount = () => {
     setLike(prevLike => prevLike + 1);
 }

 //modifying date data 
    const dateString = blog.blogDate;
    const date = new Date(dateString);
    const dateFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
    const formattedDate = dateFormatter.format(date);

    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

            <div className='card'>
                <div className="text-container">

                    <h3 style={{ color: "gray" }}>{blog.blogID}</h3>
                    <img src={blog.blogImage} alt="blog-post" height="200px" width="300px" />
                    <h2 className='status'> {blog.blogTitle}</h2>
                    <p className='status'> {blog.blogArticle}</p>
                    <span style={{ color: "deeppink" }}>{blog.blogCategory}</span>

                    <p className='author'>{blog.blogAuthor},{formattedDate}</p>

                    <div className='align'>

                        <button style={{ backgroundColor: "green" }}>READ MORE</button>
                        {blog.likes && blog.comments && (

                            <div className='feedback'>
                                <div className='response'>
                                    <i onClick={incrementCount} className="bi bi-heart-fill"></i>
                                    {Like}
                                    <span style={{ marginLeft: '15px' }}> <i onClick={incrementComment} className="bi bi-chat-left-fill"></i></span>
                                    {Comment}
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DisplayComponent

