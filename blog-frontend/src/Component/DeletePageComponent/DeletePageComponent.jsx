import React, { useState } from 'react'
import './DeletePageComponent.css'
import axios from 'axios'

const DeletePageComponent = () => {
  const [blogInfo, setblogInfo] = useState({
    blogID: '',
    blogTitle: '',
    blogArticle: '',
    blogAuthor: '',
    blogCategory: '',
    blogImage: ''
  })

  const inputHandler = (event) => {
    const { name, value } = event.target
    setblogInfo({
      ...blogInfo, [name]: value
    })
  }

  const { blogID,
    blogTitle,
    blogArticle,
    blogAuthor,
    blogCategory,
    blogImage } = blogInfo;

  const blogIdValidator = async () => {
    // event.preventDefault()
    await axios.post('http://localhost:3500/api/v1/blogs/validate', { ID: blogInfo.blogID })
      .then(response => {
        console.log(response.data)
        var data = response.data
        if (data) {
          setblogInfo({
            ...blogInfo,
            blogTitle: data.blogTitle,
            blogArticle: data.blogArticle,
            blogAuthor: data.blogAuthor,
            blogCategory: data.blogCategory,
            blogImage: data.blogImage,
          });
        }
      })
      .catch(error => {
        alert(`Status ${error.response.status}-${error.response.data.message}`);
      })
  };

  const formSubmitHandler = (event) => {
    event.preventDefault()
    console.log(blogInfo)
    axios.delete(`http://localhost:3500/api/v1/blogs?blogID=${blogInfo.blogID}`)
      .then(response => {
        alert(response.data.message)
        window.location.href = '/'
      })
      .catch(error => alert(`Status ${error.response.status}-${error.response.data.message}`))

  };
  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Delete a blog</h2>

      <div className='form-group'>
        <label>BLOG ID</label>
        <input
          type='text'
          placeholder='Enter the blog ID'
          value={blogID}
          name="blogID"
          onChange={inputHandler}
          required
        />
      </div>

      <div>
        <button type="button" onClick={blogIdValidator}>Check</button>
      </div>

      <div className='form-group'>
        <label>BLOG TITLE</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the blog title'
          value={blogTitle}
          name="blogTitle"
          onChange={inputHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>BLOG ARTICLE</label>
        <textarea rows="4" placeholder='Enter the blog article'
          value={blogArticle}
          name="blogArticle"
          onChange={inputHandler}
          required cols="50" />
      </div>

      <div className='form-group'>
        <label>BLOG AUTHOR</label>
        <input
          type='text'
          placeholder='Enter the genre'
          value={blogAuthor}
          name="blogAuthor"
          onChange={inputHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>BLOG CATEGORY</label>
        <select className='select-field'
          type='text'
          placeholder='Enter the blog category'
          value={blogCategory}
          name="blogCategory"
          onChange={inputHandler}
          required
        >
          <option>--SELECT--</option>
          <option value="technology">Technology</option>
          <option value="fitness">Fitness</option>
          <option value="fashion">Fashion</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      { blogImage && <img src={blogImage} alt="image" width="300px" />}

      <div>
        <button type='submit'>DELETE</button>
      </div>
    </form>
  );
}

export default DeletePageComponent