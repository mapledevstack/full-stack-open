const Person = ({person, handleDelete}) => {
  return (
    <div>
      <label>{person.name} - {person.number} </label>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  )
}
export default Person
