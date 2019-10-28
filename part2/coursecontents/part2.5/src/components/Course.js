import React from 'react'

const Course = ({ course }) => {
  const rows = () => course.parts.map(part =>
    <Part key={part.id} part={part}/>
  )
  return(
    <div>
        <Header course={course} />
        <Content rows={rows}/>
        <Total course={course} />
    </div> 
  )
}

const Header = ({ course }) =>
<h3 key={course.id}>{course.name} </h3> 

const Content = ({ rows }) => 
 <div>{rows()}</div>

const Part = ({ part }) => 
 <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {
  const total = course.parts.map(num => num.exercises).reduce((a, b) => a + b, 0)

  return <p><strong>Total of {total} exercises</strong></p>
}

export default Course