/** @format */

import { useEffect, useState } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

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

  useEffect(() => {
    console.log("persons hook");
    const serverUrl = "http://localhost:3001";
    axios
      .get(`${serverUrl}/persons`)
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => {
        console.error("request failed:", err);
      });
  }, []);
  console.log("render", persons.length, "peronsons");

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
