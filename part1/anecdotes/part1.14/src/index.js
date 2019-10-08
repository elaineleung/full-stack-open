import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Count = ({ selected, vote1, vote2, vote3, vote4, vote5, vote6 }) => {
  return (
  (
    (selected === 0) ? <p>has {vote1} votes</p> :
    (selected === 1) ? <p>has {vote2} votes</p> :
    (selected === 2) ? <p>has {vote3} votes</p> :
    (selected === 3) ? <p>has {vote4} votes</p> :
    (selected === 4) ? <p>has {vote5} votes</p> :
    <p>has {vote6} votes</p>
    )
  )
}

const Most = ({ favourite }) => {
  return(
  <div>
    <p>{favourite.anecdote}</p>
    <p>has {favourite.votecount} votes!</p>
  </div>)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote1, setVote1] = useState(0)
  const [vote2, setVote2] = useState(0)
  const [vote3, setVote3] = useState(0)
  const [vote4, setVote4] = useState(0)
  const [vote5, setVote5] = useState(0)
  const [vote6, setVote6] = useState(0)
  const length = anecdotes.length

  const allstats = [
    { votecount: vote1, anecdote: anecdotes[0] },
    { votecount: vote2, anecdote: anecdotes[1] },
    { votecount: vote3, anecdote: anecdotes[2] },
    { votecount: vote4, anecdote: anecdotes[3] },
    { votecount: vote5, anecdote: anecdotes[4] },
    { votecount: vote6, anecdote: anecdotes[5] }
  ]

  const votes = Array.from(allstats, o => o.votecount)
  const maxstat = Math.max(...votes)
  const favourite = allstats.find(o => o.votecount === maxstat)

  const handleVoteClick = () => (
    (selected === 0) ? setVote1(vote1 + 1) :
    (selected === 1) ? setVote2(vote2 + 1) :
    (selected === 2) ? setVote3(vote3 + 1) :
    (selected === 3) ? setVote4(vote4 + 1) :
    (selected === 4) ? setVote5(vote5 + 1) :
    setVote6(vote6 + 1)
  )

  const getRandom = () => {
    setSelected(Math.floor(Math.random() * length) + 0)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Count selected={selected} vote1={vote1} vote2={vote2} vote3={vote3} vote4={vote4} vote5={vote5} vote6={vote6} />
      <Button onClick={handleVoteClick} text={'Vote!'} /> 
      <Button onClick={getRandom} text={'Next anecdote!'} /> 
      <h1>Anecdote with most votes</h1>
      <Most favourite={favourite} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)