import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm =  (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created "${content}"`, 5)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>Write a new anecdote here.</div>
        <textarea rows="5" cols ="50" name="anecdote"></textarea>
        <div><button type="submit">Create</button></div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification, 
  createAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)