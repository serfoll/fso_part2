/** @format */

import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

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
    } else if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setErrMsg(`"${newName}" is already added to phonebook`);
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

    console.log("add: ", newPerson);

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    setErrMsg("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      {errorMsg && errorMsg !== "" && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
      )}
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter.trim().toLowerCase()} />
    </div>
  );
};

export default App;
