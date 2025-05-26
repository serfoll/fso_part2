/** @format */

import { useEffect, useState } from "react";

import personsServices from "./services/persons";
import helpers from "./utils/helpers";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [filter, setFilter] = useState("");

  const addNewPerson = (e) => {
    e.preventDefault();

    if (errorMsg.length > 0) setErrMsg("");

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

    if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === newPerson.name.toLowerCase() &&
          helpers.normalizeNumber(person.number) ===
            helpers.normalizeNumber(newPerson.number)
      )
    ) {
      setErrMsg(`"${newName}" is already added to phonebook`);
      return;
    } else if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === newPerson.name.toLowerCase() &&
          helpers.normalizeNumber(person.number) !==
            helpers.normalizeNumber(newPerson.number)
      )
    ) {
      const personToUpdate = persons.find(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      const updatedPersonData = { ...personToUpdate, number: newPerson.number };

      updatePerson(updatedPersonData);
    } else {
      createPerson(newPerson);
    }
  };

  const createPerson = (newPerson) => {
    console.log("new person to add", newPerson);

    personsServices.create(newPerson).then((personCreated) => {
      setPersons(persons.concat(personCreated));
      setNewName("");
      setNewNumber("");
      setErrMsg("");
      console.log("person added: ", newPerson);
    });
  };

  const updatePerson = (person) => {
    console.log("person to update", person);

    if (
      window.confirm(
        `${person.name} is already in phonebook, would you like to update the number?`
      )
    ) {
      personsServices
        .update(person.id, person)
        .then((updatedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          )
        );
    }
  };

  const onDeletePerson = (person) => {
    console.log("person to delete", person.id);

    if (window.confirm(`Delete ${person.name}`)) {
      personsServices.deletePerson(person.id).then((personDeleted) => {
        console.log("person delete", personDeleted);
        setPersons(persons.filter((person) => person.id !== personDeleted.id));
      });
    }
  };

  useEffect(() => {
    personsServices.getAll().then((initalPersons) => {
      console.log("getAll result:", initalPersons);
      setPersons(initalPersons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      {errorMsg && errorMsg !== "" && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
      )}
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter.trim().toLowerCase()}
        deletePerson={onDeletePerson}
      />
    </div>
  );
};

export default App;
