/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">Anecdotes</Link>
            <Link style={padding} to="/create">Create new</Link>
            <Link style={padding} to="/about">About</Link>
          </div>
          <Notification notification={props.notification} />
          <Route exact path="/" render={() => <AnecdoteList anecdotes={props.anecdotes}/>} />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={props.anecdoteById(match.params.id)} />}
          />
          <Route path="/create" render={() => <CreateNew addNew={props.addNew} setNotification={props.setNotification}/>} />
          <Route path="/about" render={() => <About />} />
        </div>
      </Router>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>For more info, see <a href={`${anecdote.info}`}>{anecdote.info}</a></div>
    </div>
  )
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div className="footer">
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

let CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
    props.setNotification(`A new anecdote "${content}" was created!`)
    setTimeout(() => {
      props.setNotification(null)
    }, 5000)
    console.log(props.notification)
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content <input size='80' name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          Author <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          URL for more info <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

CreateNew = withRouter(CreateNew)

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className="success">
      {notification}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} anecdoteById={anecdoteById} addNew={addNew} notification={notification} setNotification={setNotification}/>

      <Footer />
    </div>
  )
}

export default App;