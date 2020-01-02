import React from 'react'

const BlogForm = (props) => (
  <section>
    <form onSubmit={props.addBlog}>
      <div>
        <div className="label">Title: </div>
        <div className="input"><input 
          onChange={props.handleTitleChange}
          value={props.newBlogTitle} 
          size="50"
        /></div>
      </div>
      <div>
        <div className="label">Author: </div>
        <div className="input"><input
          onChange={props.handleAuthorChange} 
          value={props.newBlogAuthor} 
          size="50"
        /></div>
      </div>
      <div>
        <div className="label">Blog url: </div>
        <div className="input"><input
          onChange={props.handleUrlChange} 
          value={props.newBlogUrl}
          size="50" 
        /></div>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form> 
  </section>
)

export default BlogForm