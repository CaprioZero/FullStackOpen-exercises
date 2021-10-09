import React from 'react';
import Header from './Header';
import Total from './Total';
import Content from './Content';

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

export default Course