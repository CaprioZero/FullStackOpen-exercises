import React from 'react';

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

export default Total