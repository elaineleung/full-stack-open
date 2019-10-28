import React from 'react'
import ReactDOM from 'react-dom'


const Curriculum = ({ courses }) => {
    const courserows = () => 
        courses.map(course => 
        <Course 
            key={course.id}
            course={course} 
        />
    )
    return(
        <div>
            <PageTitle />
            <Courses courserows={courserows}/>
        </div>
    )
}

const PageTitle = () => <h1>Web development curriculum</h1>  

const Courses = ({ courserows }) => 
   <div><ul>{courserows()}</ul></div>

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

const App = () => {
      
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

  return (
    <div>
      
      <Curriculum courses={courses} />
    </div>

  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
