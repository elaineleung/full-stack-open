import React from 'react'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      <div className="label">Username:</div>
      <div className="input"><input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        /></div>
    </div>
    <div>
      <div className="label">Password:</div>
      <div className="input"><input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        /></div>
    </div>
    <div className="button"><button type="submit">login</button></div>
  </form>      
)

export default LoginForm