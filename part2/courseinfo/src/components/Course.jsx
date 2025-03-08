const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {
  return(
    <ul>
    {parts.map(part =>
      <li key={part.id}><Part name={part.name} exercises={part.exercises} /></li>
    )}
    </ul>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Course = ({course}) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0 )

  return (
    <>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total total={totalExercises} />
    </>
  )
}

const DisplayCourses = ({courses}) => {
  return(
    <ul>
      {courses.map(course =>
        <li key={course.id}><Course course={course} /></li>
      )}
    </ul>
  )
}

export default DisplayCourses