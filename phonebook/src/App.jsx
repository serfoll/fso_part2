/** @format */

import { useState } from "react";

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "12345678" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMsg, setErrMsg] = useState("");

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
    setErrMsg("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {errorMsg && errorMsg !== "" && (
        <p style={{ color: "red" }}>{errorMsg}</p>
      )}
      <form onSubmit={addNewName}>
        <div>
          <label htmlFor="newName">name: </label>
          <input
            id="newName"
            name="newName"
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
