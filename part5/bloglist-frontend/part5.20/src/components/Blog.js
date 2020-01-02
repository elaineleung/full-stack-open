import React, { useState } from 'react'

const Blog = ({ user, blog, handleLike, removeEntry }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogUser = blog.user
  // const blogUserId = blog.user.id

  const showRemove = () => {
    if (!blogUser || blogUser.id!==user.id) {
      return null
    } else if (blogUser.id===user.id) {
      return (
        <button className='button remove' onClick={() => removeEntry(blog.id)}>Remove</button>
      )
    }
  }
  // ?
  // : null

  return (
    <div>
      <div style={hideWhenVisible} className='blog simple' onClick={() => setBlogVisible(true)}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible} className='blog more'>
        <div className='click' onClick={() => setBlogVisible(false)}>
          <p>{blog.title} by {blog.author}</p>
          <p><a href={blog.url}>{blog.url}</a></p>
          { blogUser ? <p>Added by {blogUser.name} ({blogUser.username})</p> : null }
        </div>
        <p>{blog.likes} likes <button className='button likes' onClick={() => handleLike(blog.id)}>Like!</button></p>
        <p>{showRemove()}</p>
      </div>
    </div>
  )
}

export default Blog