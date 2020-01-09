import React from 'react'
import { connect } from 'react-redux'
import Toggleable from '../components/Toggleable'
import NewBlog from '../components/NewBlog'
import BlogList from '../components/BlogList'

const Home = (props) => {
  const newBlogRef = React.createRef()
  return(
    <div>
      <Toggleable buttonLabel='Create new' ref={newBlogRef}>
        <NewBlog />
      </Toggleable>
      <BlogList loggedUser={props.loggedUser} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    loggedUser: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)