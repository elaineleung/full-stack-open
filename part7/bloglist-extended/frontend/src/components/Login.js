import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Notification from '../components/Notification'
import { connect } from 'react-redux'

const Login = (props) => {

  return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Notification />
        <Header as='h2' color='black' textAlign='center'>
        Login to Blog App
        </Header>
        <Form size='large' onSubmit={props.handleLogin}>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username here' {...props.username} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password here'
              type='password'
              {...props.password}
            />
            <Button type="submit" fluid size='large'>
            Login
            </Button>
          </Segment>
        </Form>
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