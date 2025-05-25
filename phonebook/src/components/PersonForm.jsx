/** @format */

const PersonForm = ({
  addNewName,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => (
  <form onSubmit={addNewName}>
    <div>
      <label htmlFor="newName">name: </label>
      <input
        id="newName"
        name="new name"
        onChange={(e) => setNewName(e.target.value.trimStart())}
        placeholder="John Doe"
        value={newName}
      />
    </div>
    <div>
      <label htmlFor="newNumber">number: </label>
      <input
        id="newNumber"
        name="new number"
        onChange={(e) => setNewNumber(e.target.value.trimStart())}
        placeholder="012-345 67 80"
        value={newNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;
