import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { createBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  return (
    <Table striped celled size='large'>
      <Table.Body>
        {props.blogs.map(blog =>
          <Table.Row key={blog.id}>
            <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)