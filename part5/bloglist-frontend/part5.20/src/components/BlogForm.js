import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => (
  <section>
    <form className="form" onSubmit={addBlog}>
      <div>
        <div className="label">Title: </div>
        <div className="input"><input { ...newBlogTitle.omitreset } size="50" /></div>
      </div>
      <div>
        <div className="label">Author: </div>
        <div className="input"><input { ...newBlogAuthor.omitreset } size="50" /></div>
      </div>
      <div>
        <div className="label">Blog url: </div>
        <div className="input"><input { ...newBlogUrl.omitreset } size="50" /></div>
      </div>
      <div>
        <button className="button" type="submit">Create</button>
      </div>
    </form>
  </section>
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm