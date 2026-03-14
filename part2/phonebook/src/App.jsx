import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    axios
      .get(url)
      .then(res => setPersons(res.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newPerson)) {
      alert(`${newPerson} is already in the list`)
      return
    }

    setPersons(prevPersons => [...prevPersons, {name: newPerson, number: newNumber, id: (persons.length + 1)}])
    setNewPerson('')
    setNewNumber('')
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

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
      <Persons personsToShow={personsToShow}/>
      
    </div>
  )
}

export default App
