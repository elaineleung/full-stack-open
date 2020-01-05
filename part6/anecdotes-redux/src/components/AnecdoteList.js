import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.anecdotes.find(a => a.id === id)
    const message = `You voted for "${anecdote.content}"`
    props.voteAnecdote(id)
    props.setNotification(message)
    setTimeout(() => props.removeNotification(''), 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div className="anecdote" key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button 
            onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const visibleAnecdotes = ({ filter, anecdotes }) => 
  filter.length === 0
  ? anecdotes 
  : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()) )


const mapStateToProps = (state) => {
  return {
    anecdotesToShow: visibleAnecdotes(state),
    notification: state.notification,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification, 
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)