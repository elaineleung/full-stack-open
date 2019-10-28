import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import axios from 'axios'
 
axios.get('https://restcountries.eu/rest/v2/all').then(response => {
  const countries = response.data
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})
