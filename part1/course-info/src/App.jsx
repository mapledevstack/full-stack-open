const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14},
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App


const Header = (prop) => {
  return (
    <>
      <h1>{prop.course.name}</h1>
    </>
  )
}


const Content = (prop) => {
  return (
    <>
      {
        prop.parts.map((part, i) => (
          <Part part={part} key={i}/>
        ))
      }
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Part = (prop) => {
  return (
    <>
      <p>
        {prop.part.name} {prop.part.exercises}
      </p>
    </>
  )
}
