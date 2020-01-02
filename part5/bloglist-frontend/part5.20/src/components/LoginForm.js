import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password,
}) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        <div className="label">Username:</div>
        <div className="input"><input {...username.omitreset} /></div>
      </div>
      <div>
        <div className="label">Password:</div>
        <div className="input"><input {...password.omitreset} /></div>
      </div>
      <div><button className="button" type="submit">Login</button></div>
    </form>
  )}

export default LoginForm