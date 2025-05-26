/** @format */

import { useEffect, useState } from "react";

import personsServices from "./services/persons";
import helpers from "./utils/helpers";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [filter, setFilter] = useState("");

  const addNewPerson = (e) => {
    e.preventDefault();

    if (notificationMessage !== null) setNotificationMessage(null);

    if (!newName || newName === "") {
      setNotificationMessage({ text: "Please provide a name!", type: "error" });
      return;
    } else if (!newNumber || newNumber === "") {
      setNotificationMessage({
        text: "Please provide a phone number!",
        type: "error",
      });
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
      setNotificationMessage({
        text: `"${newName}" is already added to phonebook`,
        type: "warning",
      });
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

    personsServices
      .create(newPerson)
      .then((personCreated) => {
        setPersons(persons.concat(personCreated));
        setNewName("");
        setNewNumber("");
        setNotificationMessage({
          text: `"${personCreated.name}" has been added`,
          type: "success",
        });
        console.log("person added: ", newPerson);
      })
      .catch(() => {
        setNotificationMessage({
          text: `Failed to add "${newPerson.name}" `,
          type: "error",
        });
      });
  };

  const updatePerson = (person) => {
    console.log("person to update", person);

    if (
      window.confirm(
        `"${person.name}" is already in phonebook, would you like to update the number?`
      )
    ) {
      personsServices
        .update(person.id, person)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNotificationMessage({
            text: `"${person.name}" has been updated`,
            type: "success",
          });
        })
        .catch(() => {
          setNotificationMessage({
            text: `"${person.name}" is already removed from the server`,
            type: "error",
          });
        });
    }
  };

  const onDeletePerson = (person) => {
    console.log("person to delete", person.id);

    if (window.confirm(`Delete ${person.name}`)) {
      personsServices
        .deletePerson(person.id)
        .then((personDeleted) => {
          console.log("person delete", personDeleted);
          setPersons(
            persons.filter((person) => person.id !== personDeleted.id)
          );
          setNotificationMessage({
            text: `"${person.name}" has been deleted`,
            type: "success",
          });
        })
        .catch(() => {
          setNotificationMessage({
            text: `"${person.name}" already deleted`,
            type: "error",
          });
          setPersons(
            persons.filter((currentPerson) => currentPerson.id !== person.id)
          );
        });
    }
  };

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      console.log("getAll result:", initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => setNotificationMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      <Notification msg={notificationMessage} />
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
