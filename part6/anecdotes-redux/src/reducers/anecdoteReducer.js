const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      console.log('NEW_ANECDOTE', action.data)
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
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
      return anecdotes.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

// error occurred because I had "content" instead of "data"

export default anecdoteReducer



// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// // anecdotes are turned into objects

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       return [...state, action.data]
//     case 'VOTE':
//       const id = action.data.id
//       const anecdoteToVote = state.find(a => a.id === id)
//       const votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       const anecdotes = state.map(anecdote =>
//         anecdote.id !== id ? anecdote : votedAnecdote
//       )
//       return anecdotes.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
//     default:
//       return state
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default anecdoteReducer