import React from 'react'
// import { connect } from 'react-redux'

const User = (props) => {
  console.log('<User/>', props)

  if ( props.selectedUser === undefined) {
    return null
  } else if ( props.selectedUser && props.selectedUser.blogs.length === 0) {
    return (
      <div>
        <h2>{props.selectedUser.name}</h2>
        <div>{props.selectedUser.name} has not added any blogs yet.</div>
      </div>
    )
  }
  return (
    <div>
      <h2>{props.selectedUser.name}</h2>
      <div>The following blogs were added by this user:</div>
      <ul>{props.selectedUser.blogs.map(b => <li key={b.id}>{b.title}</li>)}</ul>
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     blogs: state.blogs,
//     users: state.users
//   }
// }

// export default connect(
//   mapStateToProps,
//   null
// )(User)

export default User