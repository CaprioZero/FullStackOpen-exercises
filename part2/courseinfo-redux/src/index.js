import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

// const Total = ({ course }) => {
//   let sum = 0
//   course.parts.map(part =>
//     sum += part.exercises
//   )
//   return (
//     <p><b>total of {sum} exercises</b></p>
//   )
// }

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, arr) => {
    // return the sum with previous value
    return total + arr.exercises;
    // set initial value as 0
  }, 0);
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )}
    </>
  )
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

  return <Course courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))