import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm =  (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const message = `You created "${content}"`
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    props.createAnecdote(newAnecdote)
    props.setNotification(message)
    setTimeout(() => props.removeNotification(''), 5000)
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
  removeNotification,
  createAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)