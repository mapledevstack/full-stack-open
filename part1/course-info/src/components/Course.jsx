import Content from "./Content"
import Header from "./Header"

const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development cirriculum</h1>
      {
        courses.map(course => (
          <div key={course.id}>
            <Header heading={course.name} />
            <Content parts={course.parts} />
          </div>
        ))
      }     
    </div>
  )
}

export default Course
