/** @format */

const Filter = ({ filter, onFilter }) => {
  return (
    <div>
      <label htmlFor="countrie">find countries: </label>
      <input
        onChange={(e) => onFilter(e.target.value)}
        id="countrie"
        name="countrie"
        type="text"
        value={filter}
      />
    </div>
  );
};

export default Filter;
