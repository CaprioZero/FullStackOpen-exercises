import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })

    // setNewFilter('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
    const regex = new RegExp(newFilter, 'gi')
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }

  const handleDeletePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(
          console.log(`${name} deleted`),
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <br />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      {/*<div>debug: {newName}</div>*/}
      <h3>Numbers</h3>
      <Persons persons={persons} handleDeletePerson={handleDeletePerson} />
    </>
  )
}

export default App