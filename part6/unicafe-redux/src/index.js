import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

//Not sure what is meant by "the form of the state in the store" so this is all I can do for now

store.dispatch({ type: 'GOOD' })
store.dispatch({ type: 'GOOD' })
store.dispatch({ type: 'GOOD' })
store.dispatch({ type: 'GOOD' })
store.dispatch({ type: 'GOOD' })
store.dispatch({ type: 'OK' })
store.dispatch({ type: 'OK' })
store.dispatch({ type: 'BAD' })
store.dispatch({ type: 'BAD' })
store.dispatch({ type: 'BAD' })

const App = () => {
  const good = () => { store.dispatch({ type: 'GOOD' }) }
  const ok = () => { store.dispatch({ type: 'OK' }) }
  const bad = () => { store.dispatch({ type: 'BAD' }) }
  const reset = () => { store.dispatch({ type: 'ZERO' }) }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)