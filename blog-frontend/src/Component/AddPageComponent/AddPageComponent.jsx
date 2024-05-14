import axios from 'axios'
import React, { useState } from 'react'
import './AddPageComponent.css'

const AddPageComponent = () => {

  const [blogInfo, setblogInfo] = useState({
    blogID: '',
    blogTitle: '',
    blogArticle: '',
    blogAuthor: '',
    blogDate: Date.now(),
    blogCategory: '',
    blogImage: null
  })

  const { blogID,
    blogTitle,
    blogArticle,
    blogAuthor,
    blogCategory,
    blogDate,
    blogImage } = blogInfo;


  const inputHandler = (event) => {
    const { name, value } = event.target
    setblogInfo({
      ...blogInfo, [name]: value
    })
  }

  const imageHandler = (event) => {
    const file = event.target.files[0]
    setblogInfo({ ...blogInfo, blogImage: event.target.files[0] })
    console.log(event.target.files[0])
    console.log(file.name)
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    // formData.append(name, value) – add a form field with the given name and value,
    formData.append('blogID', blogID)
    formData.append('blogTitle', blogTitle)
    formData.append('blogArticle', blogArticle)
    formData.append('blogAuthor', blogAuthor)
    formData.append('blogCategory', blogCategory)
    formData.append('blogDate', blogDate)
    formData.append('blogImage', blogImage)
    console.log(formData)

    await axios.post('http://localhost:3500/api/v1/blogs/toUpload/image', formData)
      .then(response => {
        alert(response.data.message)
        window.location.href = '/'
      }
      )
      .catch(error => alert((error.response.data)))
  }


  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Adding a new blog</h2>

      <div className='form-group'>
        <label>BLOG ID</label>
        <input
          type='text'
          placeholder='Enter the blog ID'
          value={blogID}
          pattern="B+[0-9]{3,}"
          name="blogID"
          onChange={inputHandler}
          required
        />
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
          <option value=''>--SELECT--</option>
          <option value="technology">Technology</option>
          <option value="fitness">Fitness</option>
          <option value="fashion">Fashion</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      <div className='form-group'>
        <label>BLOG IMAGE</label>
        <input
          type='file'
          onChange={imageHandler}
          required
        />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

export default AddPageComponent
