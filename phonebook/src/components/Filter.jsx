/** @format */

const Filter = ({ filter, setFilter }) => (
  <div>
    <label htmlFor="filterName">filter contact by name: </label>
    <input
      id="filterName"
      name="filter name"
      placeholder="john"
      value={filter}
      onChange={(e) => setFilter(e.target.value.trimStart())}
    />
  </div>
);

export default Filter;
