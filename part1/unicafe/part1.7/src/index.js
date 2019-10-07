import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  // For average
  const averageArray = [good, bad]
  const average = averageArray.reduce((sum, amount) => { 
    sum += amount 
    if (sum === 0) {
      return 0
    }else{
      return sum/all
    }
  }  
  )

  // For positive
  const percentage = function(pos, total) {
    if (good === 0) {
      return 0
    }else{
      return  pos/total *100
    }
  }
  const positive = percentage(good,all) + "%"

  const handleGoodClick = () => { 
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)  
    setAll(all + 1) 
  }
  const handleBadClick = () => {
    setBad(bad + 1)  
    setAll(all + 1)
  }
 
  return(
    <div>
      <h1>Give us feedback!</h1>
      <div>
        <Button onClick={handleGoodClick} text='Good!' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
      </div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Average {average}</p>
      <p>Positive {positive}</p>
    </div>
  )

}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
