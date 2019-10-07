import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({text,stat}) => {
  return <p>{text} {stat}</p>
}

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
      <div>
        <Statistics text='Good' stat={good} />
        <Statistics text='Neutral' stat={neutral} />
        <Statistics text='Bad' stat={bad} />
        <Statistics text='All' stat={all} />
        <Statistics text='Average' stat={average} />
        <Statistics text='Positive' stat={positive} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
