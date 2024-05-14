import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import DisplayComponent from './DisplayComponent'
const HomePageComponent = () => {
  const [blog, setblog] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3500/api/v1/blogs')
      .then(response => setblog(response.data))
      .catch(error => console.log(error.response.data.message))
  }, [])
  return (
    <React.Fragment>
      {/* <div>GetAllblogsComponent</div> */}
      <div className='books'>
        {blog && blog.map((blog, index) => (
          <DisplayComponent blog={blog} key={index} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default HomePageComponent