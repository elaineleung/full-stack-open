import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const History = ({good, neutral, bad, all, average, positive}) => {
 
  if (all === 0) {
    return (
      <div>
        No feedback is given yet. Give us some feedback by clicking on a button!
      </div>
    )
  }

  console.log(all)

  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

const Statistic = ({ text,stat }) => {
  return <p>{text} {stat}</p>
}

const Statistics = (props) => {
  return (
    <div>
      <Statistic text='Good' stat={props.good} />
      <Statistic text='Neutral' stat={props.neutral} />
      <Statistic text='Bad' stat={props.bad} />
      <Statistic text='All' stat={props.all} />
      <Statistic text='Average' stat={props.average} />
      <Statistic text='Positive' stat={props.positive} /> 
    </div>
    )
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
 const positive = percentage(good, all) + "%"

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
        <History good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
