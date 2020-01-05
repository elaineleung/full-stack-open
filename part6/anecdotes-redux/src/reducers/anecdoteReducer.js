import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const anecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
      const sorted = anecdotes.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
      return sorted
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (object) => {
  return async dispatch => {
    const data = await anecdoteService.update(object)
    dispatch({
      type: 'VOTE',
      data: {
        id: data.id
      }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export default anecdoteReducer
