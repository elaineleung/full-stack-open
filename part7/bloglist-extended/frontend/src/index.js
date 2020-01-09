import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './index.css'

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
// Refactoring:
//
// blogs:
// 1. Load blogs (done)
// 2. Create new
// 3. Like blogs (done)
//
// notification:
// 1. Load notification






// import React from 'react'
// import ReactDOM from 'react-dom'

// import App from './App'

// import './index.css'

// ReactDOM.render(<App />, document.getElementById('root'))