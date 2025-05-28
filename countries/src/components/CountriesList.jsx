/** @format */

const CountriesList = ({ countries, onShowCountry }) => {
  return countries.map((country) => (
    <p key={country.name.common.toLowerCase()}>
      {country.name.common}{" "}
      <button onClick={() => onShowCountry(country)}>Show</button>
    </p>
  ));
};

export default CountriesList;
