import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import servePerson from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    servePerson
      .getPersons()
      .then(fetchedPersons => setPersons(fetchedPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const targetPerson = persons.find(p => p.name.toLowerCase() === newPerson.toLowerCase())

    if(targetPerson) {
      if(confirm(`${newPerson} is already in the list. Update their number?`)) {
        servePerson
          .updatePerson(targetPerson.id, {name: newPerson, number: newNumber})
          .then(updatedPerson => setPersons(prevPersons => 
            prevPersons.map(prevPerson => 
              prevPerson.id === targetPerson.id
                ? updatedPerson
                : prevPerson
          )))
      }
    } else {
      servePerson
      .createPerson({name: newPerson, number: newNumber})
      .then(createdPerson => {
        setPersons(prevPersons => [...prevPersons, createdPerson])
      })
    }

    setNewPerson('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const targetPerson = persons.find(p => p.id === id)
    
    if(confirm(`Delete ${targetPerson.name}?`)) {
      servePerson
        .deletePerson(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        })
    }  
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const personsToShow = filter
                          ? persons.filter(person => person.name.toLowerCase().includes(filter))
                          : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleFilterChange={handleFilterChange}
        filter={filter} 
      />
      
      <h4>Add a new Number</h4>
      <PersonForm 
        handleSubmit={handleSubmit}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        newPerson={newPerson}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App
