/** @format */

const PersonForm = ({
  addNewPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => (
  <form onSubmit={addNewPerson}>
    <div>
      <label htmlFor="name">name: </label>
      <input
        id="name"
        name="name"
        onChange={(e) => setNewName(e.target.value.trimStart())}
        placeholder="John Doe"
        value={newName}
      />
    </div>
    <div>
      <label htmlFor="number">number: </label>
      <input
        id="number"
        name="number"
        onChange={(e) => setNewNumber(e.target.value.trim())}
        placeholder="012-347-6780"
        type="tel"
        value={newNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;
