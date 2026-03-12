import Part from "./Part"

const Content = ({parts}) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)

  return (
    <div>
      {
        parts.map(part => (
          <Part part={part} key={part.id} />
        ))
      }
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

export default Content
