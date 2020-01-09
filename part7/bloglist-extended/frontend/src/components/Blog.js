import React from 'react'
import { likeBlog, removeBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Button, Header, TextArea, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'

let Blog = (props) => {
  const [comment, commentReset] = useField('text')

  if ( props.selectedBlog === undefined) {
    return null
  }

  const creator = props.selectedBlog.user.id === props.loggedUser.id
  const likes = props.selectedBlog.likes === null ? 0 : props.selectedBlog.likes

  const like = (id) => {
    const voted = props.blogs.find(a => a.id === id)
    props.likeBlog(voted)
    props.setNotification(`You voted for "${voted.title}"!`, 5)
  }

  const remove = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.setNotification(`The post "${blog.title}" by ${blog.author} has been removed.`, 5)
      props.history.push('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const blog = props.selectedBlog
    const commentedBlog = {
      ...blog,
      comments: [ ...blog.comments, comment.value ]
    }
    props.createComment(commentedBlog)
    props.setNotification(`You added comment "${comment.value}"!`, 5)
    commentReset()
  }

  return (
    <div className='spacing'>
      <Header as='h2'>{props.selectedBlog.title}</Header>
      <div><a href={props.selectedBlog.url}>{props.selectedBlog.url}</a></div>
      <div className='spacing'>
        <div className="ui labeled button" tabIndex="0" onClick={() => like(props.selectedBlog.id)}>
          <div className="ui red button">
            <i className="heart icon"></i> Like
          </div>
          <div className="ui basic red left pointing label">
            {likes}
          </div>
        </div>
      </div>
      <div className='spacing'>added by {props.selectedBlog.user.name}</div>
      {creator && (<button className='negative ui button tiny' onClick={() => remove(props.selectedBlog)}>Remove post</button>)}
      <div className='spacing'>
        <h3>Comments</h3>
        {
          !props.selectedBlog.comments.length ? null :
            <div>
              <ul>{props.selectedBlog.comments.map( (c, i) => <li key={i}>{c}</li>)}</ul>
            </div>
        }
        <div className='spacing'>
          <Form onSubmit={addComment}>
            <TextArea
              placeholder='Write a comment here.'
              rows="3"
              cols ="50"
              name="comment"
              {...comment} >
            </TextArea>
            <div className='spacing'><Button type="submit">Add comment</Button></div>
          </Form>
        </div>
      </div>
    </div>
  )}

Blog = withRouter(Blog)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  createComment,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)


// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   like: PropTypes.func.isRequired,
//   remove: PropTypes.func.isRequired,
//   creator: PropTypes.bool.isRequired
// }

// const Blog = ({ user, blog, handleLike, removeEntry }) => {
//   const [blogVisible, setBlogVisible] = useState(false)

//   const hideWhenVisible = { display: blogVisible ? 'none' : '' }
//   const showWhenVisible = { display: blogVisible ? '' : 'none' }

//   const blogUser = blog.user
//   // const blogUserId = blog.user.id

//   const showRemove = () => {
//     if (!blogUser || blogUser.id!==user.id) {
//       return null
//     } else if (blogUser.id===user.id) {
//       return (
//         <button className='button remove' onClick={() => removeEntry(blog.id)}>Remove</button>
//       )
//     }
//   }
//   // ?
//   // : null

//   return (
//     <div>
//       <div style={hideWhenVisible} className='blog simple' onClick={() => setBlogVisible(true)}>
//         {blog.title} by {blog.author}
//       </div>
//       <div style={showWhenVisible} className='blog more'>
//         <div className='click' onClick={() => setBlogVisible(false)}>
//           <p>{blog.title} by {blog.author}</p>
//           <p><a href={blog.url}>{blog.url}</a></p>
//           { blogUser ? <p>Added by {blogUser.name} ({blogUser.username})</p> : null }
//         </div>
//         <p>{blog.likes} likes <button className='button likes' onClick={() => handleLike(blog.id)}>Like!</button></p>
//         <p>{showRemove()}</p>
//       </div>
//     </div>
//   )
// }

// export default Blog