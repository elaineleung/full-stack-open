/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as
  Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const UserList = (props) => {

  return(
    <div className='section'>
      <h3>Users</h3>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>User name</th>
            <th>Number of Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <td data-label="User name">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td data-label="Number of Blogs Created">{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)