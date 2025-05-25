/** @format */

import { useState } from "react";

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {filter.length > 0
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.trim().toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [filter, setFilter] = useState("");

  const addNewName = (e) => {
    e.preventDefault();

    if (!newName || newName === "") {
      setErrMsg("Please provide a name!");
      return;
    } else if (!newNumber || newNumber === "") {
      setErrMsg("Please provide a number!");
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName.trim(),
      number: newNumber.trim(),
    };

    if (persons.some((person) => person.name === newPerson.name)) {
      setErrMsg(`${newName} is already added to phonebook`);
      return;
    }

    console.log("add: ", newPerson);

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    setErrMsg("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="filterName">filter contact by name: </label>
        <input
          id="filterName"
          name="filter name"
          placeholder="john"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <br />

      <form onSubmit={addNewName}>
        <div>
          {errorMsg && errorMsg !== "" && (
            <p style={{ color: "red" }}>{errorMsg}</p>
          )}
          <label htmlFor="newName">name: </label>
          <input
            id="newName"
            name="new name"
            onChange={(e) => setNewName(e.target.value)}
            placeholder="John Doe"
            required
            value={newName}
          />
        </div>
        <div>
          <label htmlFor="newNumber">number: </label>
          <input
            id="newNumber"
            name="newnewNumberName"
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="012-345 67 80"
            required
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
