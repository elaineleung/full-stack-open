import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/loginReducer'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

let Nav = (props) => {

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.destroyToken()
    props.setUser(null)
    props.history.push('/')
  }

  return(
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item>
        <em>{props.loggedUser.name} is logged in.</em>
      </Menu.Item>.
      <Menu.Item>
        <button className='mini ui button' onClick={handleLogOut}>Logout</button>
      </Menu.Item>
    </Menu>
  )
}

Nav = withRouter(Nav)

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)