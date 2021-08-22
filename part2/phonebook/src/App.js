import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    persons.filter(person => person.name === newName).length > 0 ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/*<div>debug: {newName}</div>*/}
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App