import React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import Notification from '../components/Notification'
import { connect } from 'react-redux'

const Login = (props) => {

  return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Notification />
        <Header as='h2' color='black' textAlign='center'>
        Log in to Blog App
        </Header>
        <form className='ui form large' onSubmit={props.handleLogin}>
          <Segment stacked>
            <div class='field'>
              <label>Username</label>
              <input
                id='username'
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Username here' 
                {...props.username} />
            </div>
            <div class='field'>
              <label>Password</label>
              <input 
                id='password'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password here'
                type='password'
                {...props.password}
              />
            </div>
            <button 
              className='ui button'
              id='button' 
              type="submit" 
              fluid 
              size='large'>
            Login
            </button>
          </Segment>
        </form>
      </Grid.Column>
    </Grid>
  )}

// export default Login

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
  }
}

export default connect(
  mapStateToProps,
  null
)(Login)