import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>Like</button>
    </div>
  </div>
)

export default SimpleBlog