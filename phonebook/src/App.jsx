/** @format */

import { useState } from "react";

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name}</p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const addNewName = (e) => {
    e.preventDefault();

    if (!newName || newName === "") {
      setErrMsg("Name can't be empty");
      return;
    }

    const newPerson = {
      name: newName,
    };

    console.log("add: ", newPerson);

    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {errorMsg && errorMsg !== "" && (
        <p style={{ color: "red" }}>{errorMsg}</p>
      )}
      <form onSubmit={addNewName}>
        <div>
          <label htmlFor="newName">name:</label>
          <input
            id="newName"
            name="newName"
            placeholder="John Doe"
            value={newName}
            onChange={(e) => {
              e.target.value.length > 0 && setErrMsg("");
              setNewName(e.target.value);
            }}
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
