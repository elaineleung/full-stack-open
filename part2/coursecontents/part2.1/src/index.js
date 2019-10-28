import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
    const rows = () => course.parts.map(part =>
        // Note component is defined and then referred to here
        // Note ID must be specified here and not in the component
         <Part key={part.id} part={part}/>
    )
    return(
    <div>
      <Header course={course} />
      <Content rows={rows}/>
    </div>
    )
}

const Header = ({ course }) =>
  <h1>{course.name}</h1>

const Content = ({ rows }) => 
   <div>{rows()}</div>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>



const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
