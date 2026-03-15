import Person from "./Person"

const Persons = ({personsToShow, handleDelete}) => {
  return (
    <div>
      {
        personsToShow.map((person) => (
          <Person person={person} key={person.id} handleDelete={handleDelete}/>
        ))
      }
    </div>
  )
}
export default Persons
